<script lang="ts">
	export let name: string;
	export let points: number;
	export let rank: number;
</script>

<div class="items-centerp-3 mt-5 flex outline-4 outline-gray-300">
	<div>
		<h4>{rank}</h4>
	</div>
	<div class="mx-5 w-12 overflow-hidden rounded-full">
		<img src="https://placekitten.com/100/100" alt="" />
	</div>

	<div class="grid grid-cols-2 items-center">
		<h5>{name}</h5>
		<p>{points} Points</p>
	</div>
</div>
