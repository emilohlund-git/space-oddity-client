<script>
	import { socket } from '$lib/socket-client';
	import { gameState, player } from '$lib/store';

	const handleDrawCard = () => {
		if ($gameState.lobby.users[$gameState.currentPlayerIndex].id === $player.id) {
			const other = $gameState.lobby.users.find((u) => u.id !== $player.id);
			if (other) {
				socket.emit('PickedCard', {
					cardId: $gameState.lobby.users[0].hand.cards[0].id,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					playerNewId: $player.id,
					playerPreviousId: other.id,
					fromOpponent: false
				});
				socket.emit('ChangeTurn', {
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					playerId: $player.id
				});
			}
		}
	};
</script>

<div class="flex flex-col items-start flex-wrap gap-6">
	{#if $gameState.lobby.deck}
		<button class="" on:click={handleDrawCard}>
			<span class="countdown font-mono text-6xl">
				<span style={`--value: ${$gameState.lobby.deck.cards.length}`} />
			</span>
		</button>
	{/if}
</div>
