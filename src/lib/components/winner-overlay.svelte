<script lang="ts">
	import { winner } from '../store';
</script>

<div
	class={`z-[200] pointer-events-none absolute flex-col gap-y-4 h-screen w-full transition-all flex justify-center items-center bg-black 
		${$winner.username ? 'bg-opacity-80' : 'bg-opacity-0'}`}
>
	{#if $winner.username}
		<p>⭐ Winner: <span class="font-bold">{$winner.username}</span></p>
	{/if}
</div>
