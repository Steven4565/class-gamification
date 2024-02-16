<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';

	export let name: string;
	export let points: number;
	export let rank: number;
</script>

<div class="mt-5 flex items-center bg-gray-300 p-3">
	<div>
		<Heading tag="h4">{rank}</Heading>
	</div>
	<div class="mx-5 w-12 overflow-hidden rounded-full">
		<img src="https://placekitten.com/100/100" alt="" />
	</div>

	<div class="flex items-center">
		<Heading tag="h5">{name}</Heading>
		<P>{points} Points</P>
	</div>
</div>
