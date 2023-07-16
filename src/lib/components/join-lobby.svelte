<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { currentStep, lobby, player } from '$lib/store';
	import { onMount } from 'svelte';
	import { LobbySteps } from '../types';
	import Logo from './logo.svelte';

	let lobbyId = '';

	onMount(() => {
		socket.on('UserJoinedLobby', (payload) => {
			lobby.set(payload);
		});
		socket.on('LobbyCreated', (payload) => {
			lobby.set(payload);
		});
		socket.on('UserLeftLobby', (payload) => {
			lobby.set(payload);
		});
	});

	const handleJoinLobby = () => {
		socket.emit('JoinLobby', {
			lobbyId
		});
		currentStep.set(LobbySteps.Lobby);
	};
</script>

<Logo />
<div class="flex flex-col gap-y-2">
	{#if $player.id}
		<label for="username">Lobby ID</label>
		<input
			name="username"
			bind:value={lobbyId}
			class="input w-64 input-bordered join-item"
			placeholder="Lobby ID"
		/>
		<button on:click={handleJoinLobby} class="btn btn-wide btn-outline">Join</button>
		<button on:click={() => currentStep.set(LobbySteps.GameModes)} class="btn btn-wide btn-outline"
			>Return</button
		>
	{/if}
</div>
