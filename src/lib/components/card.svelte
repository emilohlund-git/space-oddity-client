<script lang="ts">
	import { socket } from '../socket-client';
	import { gameState } from '../store';
	import type { Card } from '../types';

	export let item: Card;

	const handlePlayCard = (e: any) => {
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
</script>

<div
	style={`background-image: url(${item.graphic}); background-position: center; background-size: contain`}
	on:click={handlePlayCard}
	on:keydown={(e) => {}}
	id={item.id}
	data-image-value={item.value}
	class="flex justify-center text-2xl items-center h-44 w-32 rounded-lg border-[1px] border-gray-700"
/>
