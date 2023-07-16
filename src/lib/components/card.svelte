<script lang="ts">
	import { socket } from '../socket-client';
	import { gameState } from '../store';
	import type { Card } from '../types';

	export let card: Card;

	const handlePlayCard = (e: any) => {
		console.log(e.target);
		const cardValue = e.target.attributes['data-image-value'].value;
		const cardId = e.target.id;

		const cardToPlay = $gameState.lobby.users[$gameState.currentPlayerIndex].hand.cards.find(
			(c) => c.id === cardId
		);

		if (cardToPlay && cardValue && cardId) {
			if (cardToPlay.specialEffect) {
				const other = $gameState.lobby.users.find((u) => u.id !== socket.id);

				if (other) {
					socket.emit('PlayedCard', {
						cardId,
						gameStateId: $gameState.id,
						lobbyId: $gameState.lobby.id,
						tableId: $gameState.table.id,
						userId: socket.id,
						targetUserId: other.id
					});
					socket.emit('ChangeTurn', {
						gameStateId: $gameState.id,
						lobbyId: $gameState.lobby.id
					});
				}
			}
		}
	};

	function drag(ev: any) {
		ev.dataTransfer.setData('text', ev.target.id);
	}

	function drop(ev: any) {
		ev.preventDefault();
		const src = document.getElementById(ev.dataTransfer.getData('text'));

		if (src) {
			const srcParent = src!.parentNode;
			const tgt = ev.currentTarget.firstElementChild;

			const matchingValues =
				src.getAttribute('data-image-value') === tgt.getAttribute('data-image-value');
			const notTheSameCard = src.id !== tgt.id;
			if (matchingValues && notTheSameCard) {
				socket.emit('MatchCards', {
					card1Id: src.id,
					card2Id: tgt.id,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					userId: socket.id
				});
				socket.emit('ChangeTurn', {
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id
				});
			}

			ev.currentTarget.replaceChild(src, tgt);
			srcParent!.appendChild(tgt);
		}
	}

	function allowDrop(ev: any) {
		ev.preventDefault();
	}
</script>

<div
	class="transition-all hover:z-[100] hover:scale-110"
	on:drop={drop}
	on:dragover={allowDrop}
	id={`drop+${card.id}`}
	style="margin-left: -60px"
>
	<div
		data-image-value={card.value}
		draggable="true"
		on:dragstart={drag}
		id={card.id}
		class="relative bg-white rounded-lg cursor-grab"
	>
		<div
			class={`absolute pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[173px] w-[125px] rounded-lg mix-blend-multiply ${
				$gameState.light === 'red' ? 'bg-red-600' : 'bg-blue-500'
			}`}
		/>
		<img
			alt="Card"
			src={card.graphic}
			on:click={handlePlayCard}
			on:keydown={(e) => {}}
			id={card.id}
			data-image-value={card.value}
			class="flex justify-center text-2xl items-center h-44 w-32 rounded-lg border-[1px] border-gray-700"
		/>
	</div>
</div>
