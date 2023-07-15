<script lang="ts">
	import { io } from '$lib/socket-client.server.server';
	import { currentStep, player } from '$lib/store';
	import { LobbySteps, type Player } from '$lib/types';
	import { onMount } from 'svelte';
	import GameModes from '../../lib/components/game-modes.svelte';
	import Logo from './logo.svelte';

	let username = '';

	onMount(() => {
		io.on('UserConnected', (payload) => {
			player.set(payload);
		});
		io.on('UserDisconnected', (payload) => {
			player.set({} as Player);
		});
	});

	const handleLogin = () => {
		io.emit('UserConnect', {
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
