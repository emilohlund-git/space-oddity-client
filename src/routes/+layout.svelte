<script lang="ts">
	import { onDestroy } from 'svelte';
	import { socket } from '../lib/socket-client';
	import { player } from '../lib/store';
	import './page.css';

	onDestroy(() => {
		socket.emit('UserDisconnect', {
			userId: $player.id
		});
	});
</script>

<main class="flex flex-col justify-center items-center h-screen w-full gap-y-8 font-[AlienLeague]">
	<slot />
</main>
