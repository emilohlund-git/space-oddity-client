<script>
	import { gameState } from '$lib/store';
</script>

<div class="flex flex-wrap w-72 max-h-80 overflow-y-scroll gap-2 my-12">
	{#each $gameState.table.disposedCards as card}
		<div class="relative">
			<div
				class={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-28 w-20 rounded-lg mix-blend-multiply ${
					$gameState.light === 'red' ? 'bg-red-500' : 'bg-[rgb(0,163,210)]'
				}`}
			/>
			<img
				src={card.graphic}
				alt="Card"
				class="h-28 w-20 rounded-lg border-[1px] border-gray-700"
			/>
		</div>
	{/each}
</div>
