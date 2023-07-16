<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { currentStep } from '$lib/store';
	import { LobbySteps } from '../types';
	import Logo from './logo.svelte';

	const handleCreateLobby = () => {
		socket.emit('CreateLobby');
		currentStep.set(LobbySteps.Lobby);
	};
</script>

<Logo />
<div class="flex flex-col gap-y-2">
	<button class="btn btn-wide btn-outline">Quick game</button>
	<button on:click={() => currentStep.set(LobbySteps.JoinLobby)} class="btn btn-wide btn-outline"
		>Lobby Game</button
	>
	<button on:click={handleCreateLobby} class="btn btn-wide btn-outline">Create Lobby</button>
	<button class="btn btn-wide btn-outline">Logout</button>
</div>
