<script lang="ts">
	import UserPodium from '$lib/components/leaderboard/UserPodium.svelte';
	import LeaderboardRow from '$lib/components/leaderboard/LeaderboardRow.svelte';
	import { enhance } from '$app/forms';
	import { fail, type SubmitFunction } from '@sveltejs/kit';
	import selectedClassStore from '$lib/stores/selectedClassStore.js';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onDestroy } from 'svelte';

	export let data;

	$: leaderboard = data.leaderboard || [];

	let isGlobal = false;

	let classId = 0;
	const unsub = selectedClassStore.subscribe(async (_classId) => {
		classId = _classId;
		onClassChange();
	});

	onDestroy(unsub);

	function onClassChange() {
		$page.url.searchParams.set('classId', classId.toString());
		isGlobal = false;
		if (browser)
			goto(`.${$page.url.pathname}?${$page.url.searchParams.toString()}`, { invalidateAll: true });
	}

	const onSubmit: SubmitFunction = ({ action, cancel }) => {
		if (action.search === '?/global') {
			isGlobal = true;
		} else if (action.search === '?/local') {
			isGlobal = false;
		} else {
			return cancel();
		}

		return async ({ result, update }) => {
			if (result.type === 'success') {
				if (result.data) {
					leaderboard = result.data.leaderboard;
				} else {
					return fail(400, { message: 'No data returned' });
				}
			}
		};
	};
</script>

<div class="mx-auto my-0 w-[800px]">
	<h2 class="h2 text-center">Leaderboard</h2>
	<div class="flex items-center justify-center gap-5 py-10">
		<form method="post" action="?/global" use:enhance={onSubmit}>
			<button class="variant-filled-primary btn rounded-xl py-1" type="submit" disabled={isGlobal}
				>All</button
			>
		</form>
		<form id="local-form-button" method="post" action="?/local" use:enhance={onSubmit}>
			<input type="hidden" name="classId" value={classId} />
			<button class="variant-filled-primary btn rounded-xl py-1" type="submit" disabled={!isGlobal}
				>This class</button
			>
		</form>
	</div>

	<div class="flex items-center justify-center gap-10">
		<div class="grid grid-cols-3 items-start gap-16">
			{#if leaderboard[1]}
				<UserPodium name={leaderboard[1].userId} points={leaderboard[1].experience} rank={2} />
			{/if}
			{#if leaderboard[0]}
				<UserPodium name={leaderboard[0].userId} points={leaderboard[0].experience} rank={1} />
			{/if}
			{#if leaderboard[2]}
				<UserPodium name={leaderboard[2].userId} points={leaderboard[2].experience} rank={3} />
			{/if}
		</div>
	</div>

	<div class="flex flex-col gap-4 pb-10">
		{#each leaderboard.slice(3) as user}
			<LeaderboardRow name={user.userId} points={user.experience} rank={4} />
		{/each}
	</div>
</div>
