<script>
	import { lobby } from '$lib/store';
	import Button from './common/button.svelte';
</script>

<div class="flex flex-col gap-y-2">
	<h2 class="text-xl">Users in lobby</h2>
	<div class="border-[1px] border-gray-700 border-opacity-20 p-4 h-full">
		{#each $lobby.users as player}
			<div class="flex gap-x-2">
				<p class="font-bold">{$lobby.host.id === player.id ? '🌟' : ''} {player.username}</p>
				<p>{player.isReady}</p>
			</div>
		{/each}
	</div>
	<div class="grid grid-flow-col">
		<div class="px-3 border-[1px] border-gray-700 border-opacity-20 flex items-center">
			{$lobby.id}
		</div>
		<Button type="button" onClick={() => navigator.clipboard.writeText($lobby.id)} text="Copy" />
	</div>
</div>
