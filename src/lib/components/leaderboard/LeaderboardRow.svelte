<script lang="ts">
	export let name: string;
	export let points: number;
	export let rank: number;
</script>

<div class="mt-5 flex items-center bg-gray-300 p-3">
	<div>
		<h4>{rank}</h4>
	</div>
	<div class="mx-5 w-12 overflow-hidden rounded-full">
		<img src="https://placekitten.com/100/100" alt="" />
	</div>

	<div class="flex items-center">
		<h5>{name}</h5>
		<p>{points} Points</p>
	</div>
</div>
