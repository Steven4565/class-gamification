<script lang="ts">
	import UserPodium from '$lib/components/leaderboard/UserPodium.svelte';
	import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
	import { Button, Heading } from 'flowbite-svelte';

	export let data;
	$: mockData = data.mockData;

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
		<UserPodium name="testName" points={1000} rank={1} url="/user/100" />
		<UserPodium name="testName" points={1000} rank={1} url="/user/100" />
		<UserPodium name="testName" points={1000} rank={1} url="/user/100" />
	</div>

	<div class="flex flex-col gap-4">
		{#each mockData as user}
			<LeaderboardRow name={user.name} points={user.points} rank={1} />
		{/each}
	</div>
</div>
