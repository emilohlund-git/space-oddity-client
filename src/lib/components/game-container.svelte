<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { gameState } from '$lib/store';
	import { onMount } from 'svelte';
	import type { Player } from '../types';
	import ChatWindow from './chat-window.svelte';
	import Deck from './deck.svelte';
	import OpponentHand from './opponent-hand.svelte';
	import PlayerHand from './player-hand.svelte';
	import Table from './table.svelte';

	onMount(() => {
		socket.on('PickedCard', (payload) => {
			gameState.set(payload);
		});
		socket.on('CardsMatched', (payload) => {
			gameState.set(payload);
		});
		socket.on('ChangeTurn', (payload) => {
			gameState.set(payload);
		});
		socket.on('PlayedCard', (payload) => {
			gameState.set(payload);
		});
	});

	let currentPlayer = {} as Player;
	let me = {} as Player | undefined;

	$: {
		currentPlayer = $gameState.lobby.users[$gameState.currentPlayerIndex];
		me = $gameState.lobby.users.find((u) => u.id === socket.id);
	}
</script>

<div class="flex flex-col gap-y-8 w-1/2">
	<div class="absolute bottom-0 left-0">
		<ChatWindow type="game" />
	</div>
	<Deck />
	<Table />
	<div class="flex flex-col gap-y-8">
		{#each $gameState.lobby.users as user}
			{#if user.id === socket.id}
				<PlayerHand {user} />
			{:else}
				<OpponentHand {user} />
			{/if}
		{/each}
	</div>
	<div class="absolute top-0 left-0 flex flex-col">
		{#if me}
			<div class="flex rounded-lg p-4 border-[1px] border-gray-700">
				You: {me.username}
			</div>
		{/if}
		<div class="flex rounded-lg p-4 border-[1px] border-gray-700">
			Turn: {currentPlayer.username}'s turn
		</div>
	</div>
</div>
