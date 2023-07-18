<script lang="ts">
	import { chooseOpponentHand } from '../store';
	import type { Player } from '../types';
	import CardBack from './card-back.svelte';

	export let user: Player;
</script>

<div
	class={`flex flex-wrap gap-2 justify-center items-center rounded-lg ${
		$chooseOpponentHand ? 'ring-blue-800 ring-2' : ''
	}`}
>
	{#each user.hand.cards as card}
		<CardBack userId={user.id} {card} id={card.id} />
	{/each}
</div>
