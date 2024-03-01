<script lang="ts">
	import UserPodium from '$lib/components/leaderboard/UserPodium.svelte';
	import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
	import { Button, Heading } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import { fail, type SubmitFunction } from '@sveltejs/kit';

	export let data;

	let leaderboard = data.leaderboard;

	let isGlobal = false;

	const onSubmit: SubmitFunction = ({ action, cancel }) => {
		console.log(action.search);
		if (action.search === '?/global') {
			isGlobal = true;
		} else if (action.search === '?/local') {
			isGlobal = false;
		} else {
			return cancel();
		}

		return async ({ result, update }) => {
			if (result.type === 'success') {
				if (result.data) leaderboard = result.data.leaderboard;
				else {
					return fail(400, { message: 'No data returned' });
				}
				await update();
			}
		};
	};
</script>

<div class="mx-auto my-0 w-[800px]">
	<h2 class="h2 text-center">Leaderboards</h2>
	<div class="flex items-center justify-center py-10">
		<form method="post" action="?/global" use:enhance={onSubmit}>
			<button class="variant-filled btn" type="submit" disabled={isGlobal}>Global</button>
		</form>
		<form method="post" action="?/local" use:enhance={onSubmit}>
			<button class="variant-filled btn" type="submit" disabled={!isGlobal}>Local</button>
		</form>
	</div>

	<div class="flex items-center justify-center gap-10">
		{#each [1, 0, 2] as ranks}
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
