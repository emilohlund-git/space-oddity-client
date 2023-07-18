<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { currentStep, lobby, player } from '$lib/store';
	import { onMount } from 'svelte';
	import { LobbySteps } from '../types';
	import Button from './common/button.svelte';
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
			playerId: $player.id,
			lobbyId
		});
		currentStep.set(LobbySteps.Lobby);
	};
</script>

<Logo />
<div class="flex flex-col gap-y-2 w-[20rem]">
	{#if $player.id}
		<form class="flex flex-col gap-y-2" on:submit={handleJoinLobby}>
			<label for="lobby-id">Lobby ID</label>
			<input
				name="lobby-id"
				bind:value={lobbyId}
				class="input w-full rounded-none bg-transparent h-[3.5rem] border-gray-500 border-opacity-20 join-item"
				placeholder={'Lobby ID'}
				required
			/>
			<Button type="submit" onClick={() => {}} text="Join" />
		</form>
		<Button type="button" onClick={() => currentStep.set(LobbySteps.GameModes)} text="Return" />
	{/if}
</div>
