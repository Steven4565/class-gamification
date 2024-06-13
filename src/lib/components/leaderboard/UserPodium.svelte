<script lang="ts">
	export let name: string;
	export let rank: number;
	export let points: number;
	export let url: string;
</script>

<div class="flex flex-col items-center justify-center">
	{#if rank == 1}
		<h3 class="text-center text-3xl font-bold text-primary-500">{rank}</h3>
		<a href={url}>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1150px-Cat_August_2010-4.jpg"
				alt=""
				class="h-[150px] w-[150px] rounded-full"
			/>
			<h6 class="text-center">{name}</h6>
		</a>
	{:else}
		<h3 class="pt-10 text-center text-2xl font-bold text-primary-500">{rank}</h3>
		<a href={url}>
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1150px-Cat_August_2010-4.jpg"
				alt=""
				class="h-[150px] w-[150px] rounded-full"
			/>
			<h6 class="text-center">{name}</h6>
		</a>
	{/if}
	<p>{points} Points</p>
</div>
