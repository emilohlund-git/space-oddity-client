<script lang="ts">
	import Diagnostics from '../lib/components/common/diagnostics.svelte';
</script>

<main
	class="page flex flex-col justify-center items-center h-screen w-full gap-y-8 font-alien-league"
>
	<slot />
	<Diagnostics />
</main>

<style>
	.page {
		position: relative;
		overflow: hidden;
	}

	.page::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha value to control the darkness */
		z-index: -1;
	}

	.page::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: url('https://ik.imagekit.io/cl1rb894z/space-oddity/space-oddity-background.jpg?updatedAt=1689702663273');
		background-position: top;
		background-size: cover;
		filter: brightness(20%); /* Adjust the brightness value to control the darkness */
		z-index: -2;
	}
</style>
