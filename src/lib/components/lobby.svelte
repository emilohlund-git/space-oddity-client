<script lang="ts">
	import { socket } from '$lib/socket-client';
	import { lobby } from '$lib/store';
	import { onMount } from 'svelte';
	import ChatWindow from './chat-window.svelte';
	import LobbyUsers from './lobby-users.svelte';
	import LogoCorner from './logo-corner.svelte';

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
</script>

{#if $lobby.id}
	<div class="flex gap-x-2">
		<LogoCorner />
		<ChatWindow type="lobby" />
		<LobbyUsers />
	</div>
{/if}
