<script lang="ts">
	import { flip } from 'svelte/animate';
	import { socket } from '../socket-client';
	import { gameState, player } from '../store';
	import type { Player } from '../types';
	import Card from './card.svelte';

	export let user: Player;
	let items = $player.hand.cards;

	const flipDurationMs = 300;

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
	};

	const handleDrag = (e: DragEvent) => {
		const target = e.target as HTMLElement;

		if (target && e.dataTransfer) {
			const data = {
				cardId: target.id,
				cardValue: target.getAttribute('data-image-value')
			};

			e.dataTransfer.setData('application/json', JSON.stringify(data));
		}
	};

	const handleDrop = (e: DragEvent) => {
		const target = e.target as HTMLElement;

		if (!target || !e.dataTransfer) return;

		const targetData = {
			cardId: target.id,
			cardValue: target.getAttribute('data-image-value')
		};

		const data = JSON.parse(e.dataTransfer.getData('application/json'));

		if (targetData.cardId === data.cardId) return;

		const draggedCardIndex = user.hand.cards.findIndex((card) => card.id === data.cardId);
		const targetCardIndex = user.hand.cards.findIndex((card) => card.id === targetData.cardId);

		if (draggedCardIndex === -1 || targetCardIndex === -1) return;

		if (
			data.cardValue === targetData.cardValue &&
			$gameState.lobby.users[$gameState.currentPlayerIndex] === user
		) {
			socket.emit('MatchCards', {
				card1Id: data.cardId,
				card2Id: targetData.cardId,
				gameStateId: $gameState.id,
				lobbyId: $gameState.lobby.id,
				userId: socket.id
			});
			socket.emit('ChangeTurn', {
				gameStateId: $gameState.id,
				lobbyId: $gameState.lobby.id
			});

			return;
		}

		player.update((p) => {
			const updatedCards = items;
			[updatedCards[draggedCardIndex], updatedCards[targetCardIndex]] = [
				updatedCards[targetCardIndex],
				updatedCards[draggedCardIndex]
			];
			user.hand.cards = updatedCards;
			return p;
		});
	};

	$: {
		items = user.hand.cards;
	}
</script>

<div class="flex flex-wrap gap-2 items-center justify-center order-1">
	{#each items as item (item.id)}
		<div
			draggable="true"
			on:dragstart={handleDrag}
			on:drop={handleDrop}
			on:dragover={handleDragOver}
			data-image-value={item.value}
			animate:flip={{ duration: flipDurationMs }}
			class="transition-all hover:z-[100] hover:scale-105 w-32 group"
			id={item.id}
			style={`margin-left: -40px`}
		>
			<Card {item} />
		</div>
	{/each}
</div>
