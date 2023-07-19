<script lang="ts">
	export let text: string;
	export let type: 'button' | 'submit' | 'reset' | null | undefined;
	export let onClick: () => void;
	export let disabled: boolean = false;
	export let reversed: boolean = false;
</script>

<button
	{type}
	{disabled}
	on:click={onClick}
	class="relative border-[1px] disabled:bg-gray-900 border-gray-500 border-opacity-20 h-[3.5rem] px-4 w-full group overflow-hidden"
>
	{#if !disabled}
		<div
			class={`z-[-1] duration-300 ease-in-out transition-all ${
				reversed ? 'group-hover:-translate-x-full' : 'group-hover:-translate-x-1/2'
			} skew-x-12 absolute w-full h-full bg-gradient-to-l from-rose-800 via-red-800 to-red-600 top-0 left-0 ${
				reversed ? '-translate-x-1/2' : '-translate-x-full'
			}`}
		/>
		<div
			class={`z-[-1] duration-300 ease-in-out transition-all ${
				reversed ? 'group-hover:translate-x-full' : 'group-hover:translate-x-1/2'
			} skew-x-12 absolute w-full h-full bg-gradient-to-r from-blue-700 via-cyan-700 to-bg-blue-700 top-0 left-0 ${
				reversed ? 'translate-x-1/2' : 'translate-x-full'
			}`}
		/>
	{/if}
	<span class="group-hover:text-white transition-colors">
		{#if disabled}
			🔒
		{/if}
		{text}</span
	>
</button>
