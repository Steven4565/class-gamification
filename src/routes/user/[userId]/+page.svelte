<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import UserActivitiyList from '$lib/components/actionList/UserActivitiyList.svelte';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data;
	let { user, classes } = data;
	let actions = data.actions;

	let selectedClass = classes[0].classId.toString();
	const classProp = classes.map((c) => {
		return {
			value: c.classId.toString(),
			name: c.class.name
		};
	});

	async function onClassChange() {
		try {
			const response = await fetch(`/api/actions?userId=${user.id}&classId=${selectedClass}`);
			const data = await response.json();
			// actions.doneAt here is a string because of the way the data is being sent from the server
			// convert doneAt to Date object
			data.forEach((action: any) => {
				action.doneAt = new Date(action.doneAt);
			});
			actions = data;
			$page.url.searchParams.set('classId', selectedClass);
			goto(`./${user.id}?${$page.url.searchParams.toString()}`, { invalidateAll: true });
		} catch {
			const t: ToastSettings = {
				message: 'Failed to fetch actions',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	}
</script>

<section class="mx-auto w-[900px]">
	<div class=" flex items-center">
		<div class="m-7 h-max">
			<img class="rounded-full" src="https://placekitten.com/200/200" alt="" />
		</div>
		<div>
			<h1 class="h1 mb-3">{user.username}</h1>
			<h3 class="h3">{user.exp} Points</h3>
			<div></div>
		</div>
	</div>

	<div class="mt-5">
		<select bind:value={selectedClass} on:change={onClassChange}>
			{#each classProp as _class}
				<option value={_class.value}>{_class.name}</option>
			{/each}
		</select>

		<h2>Recent Activities</h2>
		{#if actions}
			<UserActivitiyList actionList={actions} />
		{/if}
	</div>
</section>
