<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { currentStep, player } from '$lib/store';
	import { LobbySteps } from '../types';
	import Button from './common/button.svelte';
	import Logo from './logo.svelte';

	const handleCreateLobby = () => {
		socket.emit('CreateLobby', {
			playerId: $player.id
		});
		currentStep.set(LobbySteps.Lobby);
	};

	function redirectToJoinLobby() {
		currentStep.set(LobbySteps.JoinLobby);
	}
</script>

<Logo />
<div class="flex flex-col gap-y-2 w-[20rem]">
	<Button type="button" text="Join Lobby" onClick={redirectToJoinLobby} />
	<Button type="button" text="Create Lobby" onClick={handleCreateLobby} />
	<Button type="button" text="Logout" onClick={() => {}} />
</div>
