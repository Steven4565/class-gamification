<script lang="ts">
	export let name: string;
	export let rank: number;
	export let points: number;
	export let url: string;
</script>

<div class="flex flex-col items-center justify-center">
	<h3 class="text-center">{rank}</h3>
	<a href={url}>
		<img src="https://placekitten.com/100/100" alt="" class="h-[200px] w-[200px] rounded-full" />
		<h6 class="text-center">{name}</h6>
	</a>
	<p>{points} Points</p>
</div>
