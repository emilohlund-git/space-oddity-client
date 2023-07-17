<script>
	import { gameState } from '$lib/store';
</script>

<div class="flex flex-wrap gap-x-2 w-72" style="margin-left: 60px">
	{#each $gameState.table.disposedCards as card}
		<div style="margin-left: -60px" class="relative">
			<div class="absolute h-28 w-20 top-0 left-0 mix-blend-multiply bg-red-600 z-50 rounded-lg" />
			<img
				src={card.graphic}
				alt="Card"
				class="h-28 w-20 rounded-lg border-[1px] border-gray-700"
			/>
		</div>
	{/each}
</div>
