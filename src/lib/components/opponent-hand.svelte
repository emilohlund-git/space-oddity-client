<script lang="ts">
	import type { Player } from '../types';
	import CardBack from './card-back.svelte';

	export let user: Player;
</script>

<div class="flex flex-wrap gap-2 justify-center items-center">
	{#each user.hand.cards as card}
		<CardBack />
	{/each}
</div>
