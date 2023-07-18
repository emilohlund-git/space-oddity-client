<script lang="ts">
	import { lobby } from '$lib/store';
	import type { Message } from '../types';
	import { convertSmileysToEmoji } from '../utils/emoji-converter';

	export let message: Message;
</script>

<div class="chat chat-start">
	<div class="chat-image avatar placeholder">
		<div class="bg-neutral-focus text-neutral-content rounded-full w-8">
			<span class="text-xs">{message.player.username.slice(0, 2)}</span>
		</div>
	</div>
	<div class="chat-header">
		{$lobby.host.id === message.player.id ? '🌟' : ''}
		{message.player.username}
	</div>
	<div class="chat-bubble bg-gray-800 bg-opacity-50">{convertSmileysToEmoji(message.content)}</div>
</div>
