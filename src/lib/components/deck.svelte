<script>
	import { socket } from '$lib/socket-client';
	import { gameState, player } from '$lib/store';
	import CardBackLogo from './card-back-logo.svelte';

	const handleDrawCard = () => {
		if ($gameState.lobby.users[$gameState.currentPlayerIndex].id === $player.id) {
			const other = $gameState.lobby.users.find((u) => u.id !== $player.id);
			console.log(other);
			console.log($gameState.lobby);
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

<div class="flex flex-wrap gap-2">
	{#if $gameState.lobby.deck}
		<button on:click={handleDrawCard} class="stack">
			{#each $gameState.lobby.deck.cards as card}
				<div class="bg-black rounded-lg">
					<CardBackLogo />
				</div>
			{/each}
		</button>
		<span><b>Cards left in Deck</b>: {$gameState.lobby.deck.cards.length}</span>
	{/if}
</div>
