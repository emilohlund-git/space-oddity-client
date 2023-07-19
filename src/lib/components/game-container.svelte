<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { gameState, player, winner } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Player } from '../types';
	import ChatWindow from './chat-window.svelte';
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

<div class="flex items-center px-2 py-4 justify-start w-full h-full">
	<WinnerOverlay />
	<div class="flex flex-col justify-between gap-y-8 self-end min-h-full">
		<div>
			{#if me}
				<div class="flex p-4 border-[1px] border-gray-700 border-opacity-20">
					You: <span class="font-bold">{me.username}</span>
				</div>
			{/if}

			<div class="flex p-4 border-[1px] text-lg border-gray-700 border-opacity-20">
				Turn: <span class="font-bold">{currentPlayer.username}</span>'s turn
			</div>
		</div>

		<div class="flex flex-col self-end">
			<Table />
			<ChatWindow type="game" />
		</div>
	</div>
	<div class="flex flex-col justify-between w-full h-full">
		<div class="flex flex-col gap-y-8 items-center justify-center h-full">
			{#each $gameState.lobby.users as user}
				{#if user.id === $player.id}
					<PlayerHand {user} />
				{:else}
					<OpponentHand {user} />
					<Deck />
				{/if}
			{/each}
		</div>
	</div>
</div>
