<script lang="ts">
	import { socket } from '../socket-client';
	import { gameState } from '../store';
	import type { Player } from '../types';
	import CardBack from './card-back.svelte';

	export let user: Player;

	const handleDrawCard = (e: any) => {
		console.log(e.target);
		if (
			$gameState.lobby.users[$gameState.currentPlayerIndex].id === socket.id &&
			$gameState.lobby.deck?.cards.length === 0
		) {
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

<div class="flex flex-wrap gap-2 justify-center items-center">
	{#each user.hand.cards as card}
		<CardBack id={card.id} />
	{/each}
</div>
