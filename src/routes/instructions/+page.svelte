<script lang="ts">
	import { page } from '$app/stores';
	import SlideFive from '$lib/components/instructions/slide-five.svelte';
	import SlideFour from '$lib/components/instructions/slide-four.svelte';
	import SlideOne from '$lib/components/instructions/slide-one.svelte';
	import SlideSeven from '$lib/components/instructions/slide-seven.svelte';
	import SlideSix from '$lib/components/instructions/slide-six.svelte';
	import SlideThree from '$lib/components/instructions/slide-three.svelte';
	import SlideTwo from '$lib/components/instructions/slide-two.svelte';
	import LogoCorner from '$lib/components/logo-corner.svelte';
	import '../page.css';

	import { onDestroy, onMount, setContext } from 'svelte';

	let fragmentIdentifier: string = '';

	setContext('fragmentIdentifier', fragmentIdentifier);

	const unsubscribe = page.subscribe(($page) => {
		fragmentIdentifier = $page.url.hash;
	});

	onMount(() => {
		fragmentIdentifier = $page.url.hash;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<LogoCorner />
<div class="carousel w-full">
	<div id="item1" class="carousel-item relative w-full flex items-center justify-center">
		<SlideOne />
	</div>
	<div id="item2" class="carousel-item relative w-full flex items-center justify-center">
		<SlideTwo />
	</div>
	<div id="item3" class="carousel-item relative w-full flex items-center justify-center">
		<SlideThree />
	</div>
	<div id="item4" class="carousel-item relative w-full flex items-center justify-center">
		<SlideFour />
	</div>
	<div id="item5" class="carousel-item relative w-full flex items-center justify-center">
		<SlideFive />
	</div>
	<div id="item6" class="carousel-item relative w-full flex items-center justify-center">
		<SlideSix />
	</div>
	<div id="item7" class="carousel-item relative w-full flex items-center justify-center">
		<SlideSeven />
	</div>
</div>
<div class="flex justify-center w-full py-2 gap-2">
	<a href="/" class="btn btn-md">Take me back!</a>
	<a
		href="#item1"
		class={`btn btn-md ${
			fragmentIdentifier === '#item1' || fragmentIdentifier === '' ? 'btn-disabled' : ''
		}`}>1</a
	>
	<a href="#item2" class={`btn btn-md ${fragmentIdentifier === '#item2' ? 'btn-disabled' : ''}`}
		>2</a
	>
	<a href="#item3" class={`btn btn-md ${fragmentIdentifier === '#item3' ? 'btn-disabled' : ''}`}
		>3</a
	>
	<a href="#item4" class={`btn btn-md ${fragmentIdentifier === '#item4' ? 'btn-disabled' : ''}`}
		>4</a
	>
	<a href="#item5" class={`btn btn-md ${fragmentIdentifier === '#item5' ? 'btn-disabled' : ''}`}
		>5</a
	>
	<a href="#item6" class={`btn btn-md ${fragmentIdentifier === '#item6' ? 'btn-disabled' : ''}`}
		>6</a
	>
	<a href="#item7" class={`btn btn-md ${fragmentIdentifier === '#item7' ? 'btn-disabled' : ''}`}
		>7</a
	>
</div>
