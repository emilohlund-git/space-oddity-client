<script lang="ts">
	import { socket } from '../socket-client';
	import { gameState, showOpponentsHand } from '../store';
	import type { Card } from '../types';

	export let item: Card;

	const handlePlayCard = (e: any) => {
		const cardValue = e.target.attributes['data-image-value'].value;
		const cardId = e.target.id;

		const cardToPlay = $gameState.lobby.users[$gameState.currentPlayerIndex].hand.cards.find(
			(c) => c.id === cardId
		);

		if (cardToPlay && cardValue && cardId) {
			if (cardToPlay.specialEffect !== undefined) {
				const other = $gameState.lobby.users.find((u) => u.id !== socket.id);

				if (other) {
					if (cardToPlay.specialEffect === 0) {
						showOpponentsHand.set(true);
						socket.emit('PlayedCard', {
							cardId,
							gameStateId: $gameState.id,
							lobbyId: $gameState.lobby.id,
							tableId: $gameState.table.id,
							userId: socket.id,
							targetUserId: other.id
						});
					} else {
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
		}
	};
</script>

<div
	class={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10rem] w-[7rem] rounded-lg mix-blend-multiply ${
		$gameState.light === 'red' ? 'bg-red-500' : 'bg-blue-500'
	}`}
/>
<div
	style={`background-image: url(${item.graphic}); background-position: center; background-size: contain`}
	on:click={handlePlayCard}
	on:keydown={(e) => {}}
	id={item.id}
	data-image-value={item.value}
	class="flex justify-center text-2xl items-center z-0 h-44 w-32 rounded-lg border-[1px] border-gray-700"
/>
