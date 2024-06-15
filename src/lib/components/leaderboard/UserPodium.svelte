<script lang="ts">
	export let name: string;
	export let rank: number;
	export let points: number;
	export let className: string;
</script>

<div class="flex flex-col items-center justify-center">
	{#if rank == 1}
		<h3 class="text-center text-3xl font-bold text-primary-500">{rank}</h3>
		<img
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1150px-Cat_August_2010-4.jpg"
			alt=""
			class="h-[150px] w-[150px] rounded-full"
		/>
		<h6 class="text-center text-xl font-bold">{name}</h6>
	{:else}
		<h3 class="pt-10 text-center text-2xl font-bold text-primary-500">{rank}</h3>
		<img
			src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1150px-Cat_August_2010-4.jpg"
			alt=""
			class="h-[150px] w-[150px] rounded-full"
		/>
		<h6 class="text-center text-xl font-bold">{name}</h6>
	{/if}
	<p class="p font-bold text-primary-400">{points} Points</p>
	<p class="p text-sm">{className}</p>
</div>
