<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { currentStep, player } from '$lib/store';
	import { LobbySteps, type Player } from '$lib/types';
	import { onMount } from 'svelte';
	import GameModes from '../../lib/components/game-modes.svelte';
	import Logo from './logo.svelte';

	let username = '';

	onMount(() => {
		socket.on('UserConnected', (payload) => {
			player.set(payload);
		});
		socket.on('UserDisconnected', (payload) => {
			player.set({} as Player);
		});
	});

	const handleLogin = () => {
		socket.emit('UserConnect', {
			username
		});
		currentStep.set(LobbySteps.GameModes);
	};
</script>

<Logo />
<div class="flex flex-col gap-y-2">
	{#if !$player.id}
		<label for="username">Username</label>
		<input
			name="username"
			bind:value={username}
			class="input w-64 input-bordered join-item"
			placeholder="Username"
		/>
		<button on:click={handleLogin} class="btn btn-wide btn-outline">Login</button>
	{:else}
		<GameModes />
	{/if}
</div>
