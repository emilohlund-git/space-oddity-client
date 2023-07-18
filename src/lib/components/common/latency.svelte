<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { socket } from '../../socket-client';

	let start = writable<number>(0);
	let latency = writable<number>(0);

	setInterval(() => {
		start.set(Date.now());
		socket.emit('Ping');
	}, 1000);

	onMount(() => {
		socket.on('Pong', () => {
			latency.set(Date.now() - $start);
			console.log(Date.now() - $start);
		});
	});
</script>

<span>🏓 {$latency} ms</span>
