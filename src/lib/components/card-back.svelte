<script lang="ts">
	import { socket } from '../socket-client';
	import { chooseOpponentHand, gameState, playedCardId, player, showOpponentsHand } from '../store';
	import type { Card } from '../types';
	import CardBackLogo from './card-back-logo.svelte';

	export let id: string;
	export let card: Card;
	export let userId: string;

	const handleDrawCard = (e: any) => {
		const cardId = e.target.attributes.id.value;

		if ($chooseOpponentHand) {
			let chosenOpponentId = e.target.attributes['data-user-id'].value;
			socket.emit('PlayedCard', {
				cardId: $playedCardId,
				gameStateId: $gameState.id,
				lobbyId: $gameState.lobby.id,
				tableId: $gameState.table.id,
				playerId: $player.id,
				targetPlayerId: chosenOpponentId
			});
			socket.emit('ChangeTurn', {
				gameStateId: $gameState.id,
				lobbyId: $gameState.lobby.id,
				playerId: $player.id
			});
			chooseOpponentHand.set(false);
			return;
		}

		if (
			($gameState.lobby.users[$gameState.currentPlayerIndex].id === $player.id &&
				$gameState.lobby.deck?.cards.length === 0) ||
			$showOpponentsHand
		) {
			const other = $gameState.lobby.users.find((u) => u.id !== $player.id);
			if (other) {
				socket.emit('PickedCard', {
					cardId,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					playerNewId: $player.id,
					playerPreviousId: userId,
					fromOpponent: $showOpponentsHand
				});
				socket.emit('ChangeTurn', {
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					playerId: $player.id
				});
			}

			if ($showOpponentsHand) {
				showOpponentsHand.set(false);
			}
		}
	};
</script>

<div class="transition-all hover:z-[100] hover:scale-110">
	<div
		on:click={handleDrawCard}
		on:keydown={() => {}}
		{id}
		data-user-id={userId}
		class="relative bg-black rounded-lg z-0"
	>
		{#if $showOpponentsHand}
			<div
				class={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[10rem] w-[7rem] rounded-lg mix-blend-multiply ${
					$gameState.light === 'red' ? 'bg-red-500' : 'bg-blue-500'
				}`}
			/>
			<div
				{id}
				style={`background-image: url(${card.graphic}); background-position: center; background-size: contain`}
				class="flex justify-center text-2xl items-center z-0 h-44 w-32 rounded-lg border-[1px] border-gray-700"
			/>
		{:else}
			<CardBackLogo />
		{/if}
	</div>
</div>
