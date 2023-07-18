<script lang="ts">
	import { disconnected } from '../store';
	import Loader from './loader.svelte';
</script>

<div
	class={`z-[200] pointer-events-none absolute flex-col gap-y-4 h-screen w-full transition-all flex justify-center items-center bg-black 
		${$disconnected ? 'bg-opacity-80' : 'bg-opacity-0'}`}
>
	{#if $disconnected}
		<h2>You have disconnected from the server</h2>
		<p>Attempting to reconnect</p>
		<Loader />
	{/if}
</div>
