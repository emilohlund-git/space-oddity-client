<script lang="ts">
	import { io } from '$lib/socket-client';
	import { lobby } from '$lib/store';
	import { onMount } from 'svelte';
	import ChatWindow from './chat-window.svelte';
	import LobbyUsers from './lobby-users.svelte';
	import LogoCorner from './logo-corner.svelte';

	onMount(() => {
		io.on('UserJoinedLobby', (payload) => {
			lobby.set(payload);
		});
		io.on('LobbyCreated', (payload) => {
			lobby.set(payload);
		});
		io.on('UserLeftLobby', (payload) => {
			lobby.set(payload);
		});
	});
</script>

{#if $lobby.id}
	<div class="flex gap-x-2">
		<LogoCorner />
		<ChatWindow />
		<LobbyUsers />
	</div>
{/if}
