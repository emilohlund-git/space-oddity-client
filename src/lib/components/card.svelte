<script lang="ts">
	import { socket } from '../socket-client';
	import { chooseOpponentHand, gameState, playedCardId, player, showOpponentsHand } from '../store';
	import { SpecialEffect, type Card } from '../types';

	export let item: Card;

	const handlePlayCard = (e: any) => {
		const cardValue = e.target.attributes['data-image-value'].value;
		const cardId = e.target.id;

		const cardToPlay = $gameState.lobby.users[$gameState.currentPlayerIndex].hand.cards.find(
			(c) => c.id === cardId
		);

		if (cardToPlay && cardValue && cardId) {
			if (cardToPlay.specialEffect !== undefined) {
				const other = $gameState.lobby.users.find((u) => u.id !== $player.id);
				if (other) {
					if (cardToPlay.specialEffect === SpecialEffect.SwapHand) {
						chooseOpponentHand.set(true);
						playedCardId.set(cardId);
						return;
					}
					if (cardToPlay.specialEffect === 0) {
						showOpponentsHand.set(true);
						socket.emit('PlayedCard', {
							cardId,
							gameStateId: $gameState.id,
							lobbyId: $gameState.lobby.id,
							tableId: $gameState.table.id,
							playerId: $player.id,
							targetPlayerId: other.id
						});
					} else {
						socket.emit('PlayedCard', {
							cardId,
							gameStateId: $gameState.id,
							lobbyId: $gameState.lobby.id,
							tableId: $gameState.table.id,
							playerId: $player.id,
							targetPlayerId: other.id
						});
						socket.emit('ChangeTurn', {
							gameStateId: $gameState.id,
							lobbyId: $gameState.lobby.id,
							playerId: $player.id
						});
					}
				}
			}
		}
	};
</script>

<div
	class={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10rem] w-[7rem] rounded-lg mix-blend-multiply ${
		$gameState.light === 'red' ? 'bg-red-500' : 'bg-[rgb(0,163,210)]'
	}`}
/>
{#if item.description}
	<div class="tooltip absolute text-lg" data-tip={item.description}>
		<button class="btn">ℹ️</button>
	</div>
{/if}
<div
	class={`${$gameState.light === 'red' && item.specialEffect ? 'ring-red-500' : ''} ${
		$gameState.light === 'blue' && item.specialEffect ? 'ring-blue-500' : ''
	} ${$gameState.light === 'red' && !item.specialEffect ? 'ring-red-700' : ''} ${
		$gameState.light === 'blue' && !item.specialEffect ? 'ring-blue-700' : ''
	} absolute top-1/2 rounded-lg ring-4 pointer-events-none left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full border-[1px]`}
/>
<div
	style={`background-image: url(${item.graphic}); background-position: center; background-size: contain`}
	on:click={handlePlayCard}
	on:keydown={(e) => {}}
	id={item.id}
	data-image-value={item.value}
	class="flex justify-center text-2xl items-center z-0 h-44 w-32 rounded-lg border-[1px] border-gray-700"
/>
