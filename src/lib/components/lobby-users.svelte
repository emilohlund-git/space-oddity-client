<script>
	import { lobby } from '$lib/store';
</script>

<div class="flex flex-col gap-y-2">
	<h2 class="text-xl">Users in lobby</h2>
	<div class="border-[1px] border-gray-700 p-4 h-full rounded-lg">
		{#each $lobby.users as player}
			<div class="flex gap-x-2">
				<p class="font-bold">{$lobby.host.id === player.id ? '🌟' : ''} {player.username}</p>
				<p>{player.isReady}</p>
			</div>
		{/each}
	</div>
	<div class="flex gap-x-2">
		<div class="px-3 border-[1px] border-gray-700 flex items-center rounded-lg">
			{$lobby.id}
		</div>
		<button on:click={() => navigator.clipboard.writeText($lobby.id)} class="btn btn-outline"
			>Copy</button
		>
	</div>
</div>
