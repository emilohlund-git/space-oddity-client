<script>
	import { socket } from '$lib/socket-client';
	import { player } from '$lib/store';
</script>

<div class="absolute flex flex-col bottom-2 right-2">
	<span>🔌 {socket.id}</span>
	{#if $player.id}
		<span>👤 {$player.username}</span>
	{/if}
</div>
