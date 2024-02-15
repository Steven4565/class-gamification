<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';

	export let name: string;
	export let rank: number;
	export let points: number;
	export let url: string;
</script>

<div class="flex flex-col items-center justify-center">
	<Heading tag="h3" class="text-center">{rank}</Heading>
	<a href={url}>
		<img src="https://placekitten.com/100/100" alt="" class="h-[200px] w-[200px] rounded-full" />
		<Heading tag="h6" class="text-center">{name}</Heading>
	</a>
	<P>{points} Points</P>
</div>
