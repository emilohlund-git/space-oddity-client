<script>
	import { socket } from '$lib/socket-client';
	import { gameState } from '$lib/store';
	import CardBackLogo from './card-back-logo.svelte';

	const handleDrawCard = () => {
		if ($gameState.lobby.users[$gameState.currentPlayerIndex].id === socket.id) {
			const other = $gameState.lobby.users.find((u) => u.id !== socket.id);
			if (other) {
				socket.emit('PickedCard', {
					cardId: $gameState.lobby.users[0].hand.cards[0].id,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					userNewId: socket.id,
					userPreviousId: other.id
				});
				socket.emit('ChangeTurn', {
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id
				});
			}
		}
	};
</script>

<div>
	{#if $gameState.lobby.deck}
		<button on:click={handleDrawCard} class="stack">
			{#each $gameState.lobby.deck.cards as card}
				<div class="bg-black rounded-lg">
					<CardBackLogo />
				</div>
			{/each}
		</button>
	{/if}
</div>
