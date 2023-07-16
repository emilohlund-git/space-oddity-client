<script lang="ts">
	import type { Player } from '../types';
	import Card from './card.svelte';

	export let user: Player;
</script>

<div class="flex flex-wrap gap-2 items-center justify-center order-1">
	{#each user.hand.cards as card}
		<Card {card} />
	{/each}
</div>
