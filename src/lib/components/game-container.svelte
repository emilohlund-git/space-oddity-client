<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { counter, gameState, player, winner } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Player } from '../types';
	import Timer from './common/timer.svelte';
	import Deck from './deck.svelte';
	import OpponentHand from './opponent-hand.svelte';
	import PlayerHand from './player-hand.svelte';
	import Table from './table.svelte';
	import WinnerOverlay from './winner-overlay.svelte';

	onMount(() => {
		socket.on('PickedCard', (payload) => {
			gameState.set(payload);
		});
		socket.on('CardsMatched', (payload) => {
			const playerWithEmptyHand = payload.lobby.users.find((p) => p.hand.cards.length === 0);

			gameState.set(payload);
			if (playerWithEmptyHand) {
				socket.emit('GameOver', {
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id
				});
			}
		});
		socket.on('ChangeTurn', (payload) => {
			gameState.set(payload);
			counter.set(30);
		});
		socket.on('PlayedCard', (payload) => {
			gameState.set(payload);
		});
		socket.on('GameEnded', (payload) => {
			winner.set(payload);
		});
	});

	let currentPlayer = {} as Player;
	let me = {} as Player | undefined;
	let winningPlayer = {} as Player;

	$: {
		currentPlayer = $gameState.lobby.users[$gameState.currentPlayerIndex];
		me = $gameState.lobby.users.find((u) => u.id === $player.id);
		winningPlayer = $winner;
	}
</script>

<WinnerOverlay />
<div class="flex items-center px-2 py-4 justify-start w-full h-full">
	<div class="absolute right-40 top-1/2 -translate-y-1/2">
		<p class="text-xl font-bold">Cards in deck</p>
		<Deck />
	</div>
	<div class="absolute left-40 top-1/2 -translate-y-1/2">
		<p class="text-xl font-bold">{currentPlayer.username}'s turn</p>
		<Timer />
	</div>
	<Table />
	<div class="flex flex-col gap-y-8 items-center justify-between h-full w-full">
		{#each $gameState.lobby.users as user}
			{#if user.id === $player.id}
				<PlayerHand {user} />
			{:else}
				<OpponentHand {user} />
			{/if}
		{/each}
	</div>
</div>
