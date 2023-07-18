<script lang="ts">
	import Login from '$lib/components/login.svelte';
	import MainMenu from '$lib/components/main-menu.svelte';
	import { currentStep, disconnected, gameState, player } from '$lib/store';
	import { onMount } from 'svelte';
	import DisconnectOverlay from '../lib/components/disconnect-overlay.svelte';
	import GameContainer from '../lib/components/game-container.svelte';
	import GameModes from '../lib/components/game-modes.svelte';
	import JoinLobby from '../lib/components/join-lobby.svelte';
	import Lobby from '../lib/components/lobby.svelte';
	import { socket } from '../lib/socket-client';
	import { LobbySteps } from '../lib/types';
	import './page.css';

	onMount(() => {
		socket.on('disconnect', () => {
			disconnected.set(true);
			if ($gameState.id) {
				socket.emit('SaveGameState', {
					gameState: $gameState
				});
			}
		});
		socket.on('connect', () => {
			disconnected.set(false);
		});
		socket.on('GameStateSaved', () => {
			if ($gameState.id) {
				socket.emit('RetrieveGameState', {
					gameStateId: $gameState.id,
					reconnectingPlayer: $player
				});
			}
		});
		socket.on('GameStateRetrieved', (payload) => {
			const { gameState: _g, player: _p } = payload;
			gameState.set(_g);
		});
	});
</script>

<DisconnectOverlay />
{#if $currentStep === LobbySteps.MainMenu}
	<MainMenu />
{:else if $currentStep === LobbySteps.Login}
	<Login />
{:else if $currentStep === LobbySteps.GameModes}
	<GameModes />
{:else if $currentStep === LobbySteps.JoinLobby}
	<JoinLobby />
{:else if $currentStep === LobbySteps.Lobby}
	<Lobby />
{:else if $currentStep === LobbySteps.Game}
	<GameContainer />
{/if}
