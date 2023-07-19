<script lang="ts">
	import { currentStep, gameState, lobby, messages, player } from '$lib/store';
	import { convertSmileysToEmoji } from '$lib/utils/emoji-converter';
	import { afterUpdate, onMount } from 'svelte';
	import { socket } from '../socket-client';
	import { LobbySteps, type Lobby } from '../types';
	import Button from './common/button.svelte';
	import Message from './message.svelte';

	export let type: 'lobby' | 'game';

	let message = '';

	$: {
		message = convertSmileysToEmoji(message);
	}

	let containerRef: HTMLDivElement;

	const scrollToBottom = () => {
		containerRef.scrollTo({
			top: containerRef.scrollHeight,
			behavior: 'smooth'
		});
	};

	afterUpdate(() => {
		scrollToBottom();
	});

	onMount(() => {
		scrollToBottom();
	});

	const handleSendMessage = (e: Event) => {
		e.preventDefault();
		socket.emit('SendMessage', {
			lobbyId: $lobby.id,
			message,
			playerId: $player.id
		});
		message = '';
	};

	const handleSetReady = () => {
		socket.emit('UserReady', {
			lobbyId: $lobby.id,
			playerId: $player.id
		});
	};

	const handleLeaveLobby = () => {
		socket.emit('LeaveLobby', {
			playerId: $player.id,
			lobbyId: $lobby.id
		});
		lobby.set({} as Lobby);
		currentStep.set(LobbySteps.MainMenu);
	};

	const handleStartGame = () => {
		socket.emit('StartGame', {
			lobbyId: $lobby.id
		});
	};

	onMount(() => {
		socket.on('MessageSent', (payload) => {
			lobby.set(payload);
		});

		socket.on('UserReady', (payload) => {
			lobby.set(payload);
		});

		socket.on('UserLeftLobby', (payload) => {
			lobby.set(payload);
		});

		socket.on('GameStarted', (payload) => {
			gameState.set(payload);
			currentStep.set(LobbySteps.Game);
		});

		socket.on('error', (payload) => {
			messages.update((messages) => [...messages, payload]);
		});
	});
</script>

<div class="flex flex-col gap-y-2">
	{#if type === 'lobby'}
		<h2 class="text-xl">Lobby chat</h2>
	{/if}
	<div
		bind:this={containerRef}
		class={`border-[1px] border-gray-700 border-opacity-20 p-4 ${
			type === 'lobby' ? 'h-[25rem]' : 'h-[10rem]'
		} w-[30rem] flex flex-col gap-2 overflow-y-scroll`}
	>
		{#each $lobby.messages as message}
			<Message {message} />
		{/each}
	</div>
	<form on:submit={handleSendMessage} class="grid grid-flow-col gap-x-2">
		<input
			name="nessage"
			bind:value={message}
			class="input w-full rounded-none bg-transparent h-[3.5rem] border-gray-500 border-opacity-20 join-item"
			placeholder={'Message'}
			required
		/>
		<Button type="submit" onClick={() => {}} text="Send" />
	</form>
	{#if type === 'lobby'}
		<div class="flex gap-x-2">
			<Button type="button" onClick={handleLeaveLobby} text="Leave" />
			<Button
				type="button"
				disabled={$lobby.users.find((u) => u.id === $player.id)?.isReady}
				onClick={handleSetReady}
				text="I'm ready"
			/>
			<Button
				disabled={$lobby.users.some((player) => !player.isReady)}
				type="button"
				onClick={handleStartGame}
				text="Start"
			/>
		</div>
	{/if}
</div>
