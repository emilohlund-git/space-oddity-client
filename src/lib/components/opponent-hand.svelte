<script lang="ts">
	import type { Player } from '../types';

	export let user: Player;
</script>

<div class="flex flex-wrap gap-2 justify-center items-center">
	{#each user.hand.cards as card}
		<div
			style="margin-left: -60px"
			class="h-32 w-24 bg-black rounded-lg border-[1px] border-gray-700"
		/>
	{/each}
</div>
