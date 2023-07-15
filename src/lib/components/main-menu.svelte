<script>
	import { currentStep } from '$lib/store';
	import { LobbySteps } from '$lib/types';
	import Logo from './logo.svelte';
</script>

<Logo />
<div class="flex flex-col gap-y-2">
	<button on:click={() => currentStep.set(LobbySteps.Login)} class="btn btn-outline btn-wide"
		>Join Game</button
	>
	<button class="btn btn-outline btn-wide">Instructions</button>
	<button class="btn btn-outline btn-wide">Settings</button>
</div>
