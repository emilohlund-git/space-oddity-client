<script lang="ts">
	import { currentStep, gameState, lobby, player } from '$lib/store';
	import { convertSmileysToEmoji } from '$lib/utils/emoji-converter';
	import { afterUpdate, onMount } from 'svelte';
	import { io } from '../socket-client';
	import { LobbySteps, type Lobby } from '../types';

	export let type: 'lobby' | 'game';

	let message = '';

	$: {
		message = convertSmileysToEmoji(message);
	}

	let containerRef: HTMLDivElement;

	// Auto-scroll to the bottom of the container
	const scrollToBottom = () => {
		containerRef.scrollTo({
			top: containerRef.scrollHeight,
			behavior: 'smooth' // You can change this to 'auto' for instant scrolling
		});
	};

	// Call scrollToBottom after each update
	afterUpdate(() => {
		scrollToBottom();
	});

	// Call scrollToBottom on initial mount
	onMount(() => {
		scrollToBottom();
	});

	const handleSendMessage = (e: Event) => {
		e.preventDefault();
		io.emit('SendMessage', {
			lobbyId: $lobby.id,
			message,
			userId: $player.id
		});
		message = '';
	};

	const handleSetReady = () => {
		io.emit('UserReady', {
			lobbyId: $lobby.id,
			userId: $player.id
		});
	};

	const handleLeaveLobby = () => {
		io.emit('LeaveLobby', {
			lobbyId: $lobby.id
		});
		lobby.set({} as Lobby);
		currentStep.set(LobbySteps.MainMenu);
	};

	const handleStartGame = () => {
		io.emit('StartGame', {
			lobbyId: $lobby.id
		});
	};

	onMount(() => {
		io.on('MessageSent', (payload) => {
			lobby.set(payload);
		});

		io.on('UserReady', (payload) => {
			lobby.set(payload);
		});

		io.on('UserLeftLobby', (payload) => {
			lobby.set(payload);
		});

		io.on('GameStarted', (payload) => {
			gameState.set(payload);
			currentStep.set(LobbySteps.Game);
		});
	});
</script>

<div class="flex flex-col gap-y-2">
	{#if type === 'lobby'}
		<h2 class="text-xl">Lobby chat</h2>
	{/if}
	<div
		bind:this={containerRef}
		class={`rounded-lg border-[1px] border-gray-700 p-4 ${
			type === 'lobby' ? 'h-[25rem]' : 'h-[10rem]'
		} w-[30rem] flex flex-col gap-2 overflow-y-scroll`}
	>
		{#each $lobby.messages as message}
			<div class="flex gap-x-2 items-center">
				<p class="font-bold">
					{$lobby.host.id === message.player.id ? '🌟' : ''}
					{message.player.username}:
				</p>
				<p>{convertSmileysToEmoji(message.content)}</p>
			</div>
		{/each}
	</div>
	<form on:submit={handleSendMessage} class="flex gap-x-2 w-full">
		<input
			required
			bind:value={message}
			class="input input-bordered w-full"
			placeHolder="Message"
		/>
		<button type="submit" class="btn btn-outline">send</button>
	</form>
	{#if type === 'lobby'}
		<div class="flex gap-x-2 pr-4">
			<button on:click={handleLeaveLobby} class="btn w-1/3 btn-outline">Leave</button>
			<button
				disabled={$lobby.users.find((u) => u.id === io.id)?.isReady}
				on:click={handleSetReady}
				class={`btn w-1/3 btn-outline`}>I'm ready</button
			>
			<button on:click={handleStartGame} class="btn w-1/3 btn-outline">Start</button>
		</div>
	{/if}
</div>
