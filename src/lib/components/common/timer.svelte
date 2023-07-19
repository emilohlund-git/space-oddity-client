<script lang="ts">
	import { socket } from '../../socket-client';
	import { counter, gameState } from '../../store';

	setInterval(() => {
		if ($counter >= 0) {
			counter.update((n) => n - 1);
		}

		if ($counter === 0) {
			socket.emit('ChangeTurn', {
				gameStateId: $gameState.id,
				lobbyId: $gameState.lobby.id,
				playerId: $gameState.lobby.users[$gameState.currentPlayerIndex].id
			});
		}
	}, 1000);
</script>

<span class="countdown font-mono text-6xl">
	<span style={`--value: ${$counter}`} />
</span>
