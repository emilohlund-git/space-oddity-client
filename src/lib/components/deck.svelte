<script>
	import { io } from '$lib/socket-client';
	import { gameState } from '$lib/store';

	const handleDrawCard = () => {
		if ($gameState.lobby.users[$gameState.currentPlayerIndex].id === io.id) {
			const other = $gameState.lobby.users.find((u) => u.id !== io.id);
			if (other) {
				io.emit('PickedCard', {
					cardId: $gameState.lobby.users[0].hand.cards[0].id,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					userNewId: io.id,
					userPreviousId: other.id
				});
				io.emit('ChangeTurn', {
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
				<div class="h-28 w-20 bg-black rounded-md border-[1px] border-gray-700" />
			{/each}
		</button>
	{/if}
</div>
