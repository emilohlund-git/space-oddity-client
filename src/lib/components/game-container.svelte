<script lang="ts">
	import { io } from '$lib/socket-client';
	import { gameState } from '$lib/store';
	import { onMount } from 'svelte';

	const handleDrawCard = () => {
		if ($gameState.lobby.users[$gameState.currentPlayerIndex].id === io.id) {
			const other = $gameState.lobby.users.find((u) => u.id !== io.id);
			if (other) {
				io.emit('PickedCard', {
					cardId: $gameState.lobby.users[0].hand.cards[0].id,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					userNewId: io.id,
					userPreviousId: other.id
				});
				io.emit('ChangeTurn', {
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id
				});
			}
		}
	};

	const handlePlayCard = (e: any) => {
		console.log(e.target);
		const cardValue = e.target.attributes['data-image-value'].value;
		const cardId = e.target.id;

		const cardToPlay = $gameState.lobby.users[$gameState.currentPlayerIndex].hand.cards.find(
			(c) => c.id === cardId
		);

		if (cardToPlay && cardValue && cardId) {
			if (cardToPlay.specialEffect) {
				const other = $gameState.lobby.users.find((u) => u.id !== io.id);

				if (other) {
					io.emit('PlayedCard', {
						cardId,
						gameStateId: $gameState.id,
						lobbyId: $gameState.lobby.id,
						tableId: $gameState.table.id,
						userId: io.id,
						targetUserId: other.id
					});
					io.emit('ChangeTurn', {
						gameStateId: $gameState.id,
						lobbyId: $gameState.lobby.id
					});
				}
			}
		}
	};

	onMount(() => {
		io.on('PickedCard', (payload) => {
			gameState.set(payload);
		});
		io.on('CardsMatched', (payload) => {
			gameState.set(payload);
		});
		io.on('ChangeTurn', (payload) => {
			gameState.set(payload);
		});
		io.on('PlayedCard', (payload) => {
			gameState.set(payload);
		});
	});

	function drag(ev: any) {
		ev.dataTransfer.setData('text', ev.target.id);
	}

	function drop(ev: any) {
		ev.preventDefault();
		const src = document.getElementById(ev.dataTransfer.getData('text'));

		if (src) {
			const srcParent = src!.parentNode;
			const tgt = ev.currentTarget.firstElementChild;

			if (src.getAttribute('data-image-value') === tgt.getAttribute('data-image-value')) {
				io.emit('MatchCards', {
					card1Id: src.id,
					card2Id: tgt.id,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					userId: io.id
				});
			}

			ev.currentTarget.replaceChild(src, tgt);
			srcParent!.appendChild(tgt);
		}
	}

	function allowDrop(ev: any) {
		ev.preventDefault();
	}
</script>

<div class="flex flex-col gap-y-8">
	<div>
		{#if $gameState.lobby.deck}
			<button on:click={handleDrawCard} class="stack">
				{#each $gameState.lobby.deck.cards as card}
					<div class="h-28 w-20 bg-black rounded-md border-[1px] border-gray-700" />
				{/each}
			</button>
		{/if}
	</div>
	<div class="flex flex-wrap gap-x-2">
		{#each $gameState.table.disposedCards as card}
			<div class="relative">
				<div
					class="absolute h-28 w-20 top-0 left-0 mix-blend-multiply bg-red-600 z-50 rounded-lg"
				/>
				<img
					src={card.graphic}
					alt="Card"
					class="h-28 w-20 rounded-lg border-[1px] border-gray-700"
				/>
			</div>
		{/each}
	</div>
	<div class="flex flex-col gap-y-8">
		{#each $gameState.lobby.users as user}
			{#if user.id === io.id}
				<div class="flex flex-wrap gap-2 order-1">
					{#each user.hand.cards as card}
						<div on:drop={drop} on:dragover={allowDrop} id={`drop+${card.id}`}>
							<div
								data-image-value={card.value}
								draggable="true"
								on:dragstart={drag}
								id={card.id}
								class="relative"
							>
								<div
									class={`pointer-events-none absolute h-44 w-32 top-0 left-0 z-50 rounded-lg mix-blend-multiply ${
										$gameState.light === 'red' ? 'bg-[#c71b29]' : 'bg-[#0794b8]'
									}`}
								/>
								<div
									on:click={handlePlayCard}
									on:keydown={(e) => {}}
									id={card.id}
									data-image-value={card.value}
									class="flex justify-center text-2xl items-center h-44 w-32 rounded-lg border-[1px] border-gray-700"
								>
									<p class="pointer-events-none">{card.value}</p>
									<p class="pointer-events-none">{card.specialEffect ? card.specialEffect : ''}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex flex-wrap gap-2">
					{#each user.hand.cards as card}
						<div class="h-32 w-24 bg-black rounded-lg border-[1px] border-gray-700" />
					{/each}
				</div>
			{/if}
		{/each}
	</div>
	{$gameState.lobby.users[$gameState.currentPlayerIndex].username}
</div>
