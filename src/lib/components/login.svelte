<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { currentStep, player } from '$lib/store';
	import { LobbySteps, type Player } from '$lib/types';
	import { onMount } from 'svelte';
	import GameModes from '../../lib/components/game-modes.svelte';
	import Button from './common/button.svelte';
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

	const handleLogin = (e: any) => {
		e.preventDefault();
		socket.emit('UserConnect', {
			username: e.target[0].value
		});
		currentStep.set(LobbySteps.GameModes);
	};
</script>

<Logo />
<div class="flex flex-col gap-y-2 w-[20rem]">
	{#if !$player.id}
		<form class="flex flex-col gap-y-2" on:submit={handleLogin}>
			<label for="username">Username</label>
			<input
				name="username"
				bind:value={username}
				class="input w-full rounded-none bg-transparent h-[3.5rem] border-gray-500 border-opacity-20 join-item"
				placeholder={'Username'}
				required
			/>
			<Button type="submit" onClick={() => {}} text="Login" />
		</form>
	{:else}
		<GameModes />
	{/if}
</div>
