<script>
	import { goto } from '$app/navigation';
	import { currentStep } from '$lib/store';
	import { LobbySteps } from '$lib/types';
	import Button from './common/button.svelte';
	import Logo from './logo.svelte';

	function redirectToLogin() {
		currentStep.set(LobbySteps.Login);
	}

	function redirectToInstructions() {
		goto('/instructions');
	}

	function redirectToSettings() {}
</script>

<Logo />
<div class="flex flex-col gap-y-2 w-[20rem]">
	<Button type="button" text="Login" onClick={redirectToLogin} />
	<Button type="button" text="Instructions" onClick={redirectToInstructions} />
	<Button type="button" text="Settings" onClick={redirectToSettings} />
</div>
