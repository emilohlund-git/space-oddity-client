<script lang="ts">
	import Login from '$lib/components/login.svelte';
	import MainMenu from '$lib/components/main-menu.svelte';
	import { currentStep } from '$lib/store';
	import GameContainer from '../lib/components/game-container.svelte';
	import GameModes from '../lib/components/game-modes.svelte';
	import JoinLobby from '../lib/components/join-lobby.svelte';
	import Lobby from '../lib/components/lobby.svelte';
	import { LobbySteps } from '../lib/types';
	import './page.css';
</script>

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
