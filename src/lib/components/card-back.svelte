<script lang="ts">
	import { socket } from '../socket-client';
	import { gameState } from '../store';
	import CardBackLogo from './card-back-logo.svelte';

	export let id: string;

	const handleDrawCard = (e: any) => {
		const cardId = e.target.attributes.id.value;
		if (
			$gameState.lobby.users[$gameState.currentPlayerIndex].id === socket.id &&
			$gameState.lobby.deck?.cards.length === 0
		) {
			const other = $gameState.lobby.users.find((u) => u.id !== socket.id);
			if (other) {
				socket.emit('PickedCard', {
					cardId,
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id,
					userNewId: socket.id,
					userPreviousId: other.id
				});
				socket.emit('ChangeTurn', {
					gameStateId: $gameState.id,
					lobbyId: $gameState.lobby.id
				});
			}
		}
	};
</script>

<div class="transition-all hover:z-[100] hover:scale-110" style="margin-left: -60px">
	<div
		on:click={handleDrawCard}
		on:keydown={() => {}}
		{id}
		class="relative bg-black rounded-lg z-0"
	>
		<CardBackLogo />
	</div>
</div>
