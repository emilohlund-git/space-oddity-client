<script lang="ts">
	import { io } from '../socket-client';
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
				const other = $gameState.lobby.users.find((u) => u.id !== io.id);

				if (other) {
					io.emit('PlayedCard', {
						cardId,
						gameStateId: $gameState.id,
						lobbyId: $gameState.lobby.id,
						tableId: $gameState.table.id,
						userId: io.id,
						targetUserId: other.id
					});
					io.emit('ChangeTurn', {
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
				io.emit('MatchCards', {
					card1Id: src.id,
					card2Id: tgt.id,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					userId: io.id
				});
				io.emit('ChangeTurn', {
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
		class="relative bg-white rounded-lg"
	>
		<div
			on:click={handlePlayCard}
			on:keydown={(e) => {}}
			id={card.id}
			data-image-value={card.value}
			class="flex justify-center text-2xl items-center h-44 w-32 rounded-lg border-[1px] border-gray-700"
		>
			<p class="pointer-events-none">{card.value}</p>
			<p class="pointer-events-none">{card.specialEffect ? card.specialEffect : ''}</p>
		</div>
	</div>
</div>
