<script lang="ts">
	import UserPodium from '$lib/components/leaderboard/UserPodium.svelte';
	import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
	import { Button, Heading } from 'flowbite-svelte';

	export let data;

	const leaderboard = data.sorted;

	let isGlobal = false;

	function onGlobalClick() {
		isGlobal = true;
	}

	function onLocalClick() {
		isGlobal = false;
	}
</script>

<div class="mx-auto my-0 w-[800px]">
	<Heading class="text-center">Leaderboards</Heading>
	<div class="flex items-center justify-center py-10">
		<Button disabled={!isGlobal} on:click={onGlobalClick}>Global</Button>
		<Button disabled={isGlobal} on:click={onLocalClick}>Local</Button>
	</div>

	<div class="flex items-center justify-center gap-10">
		{#each [0, 1, 2] as ranks}
			{#if leaderboard[ranks]}
				<UserPodium
					name={leaderboard[ranks].userId}
					points={leaderboard[ranks].experience}
					rank={ranks + 1}
					url="/user/100"
				/>
			{/if}
		{/each}
	</div>

	<div class="flex flex-col gap-4">
		{#each leaderboard.slice(3) as user}
			<LeaderboardRow name={user.userId} points={user.experience} rank={4} />
		{/each}
	</div>
</div>
