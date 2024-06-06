<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import UserActivitiyList from '$lib/components/user/UserActivitiyList.svelte';
	import UserProfile from '$lib/components/user/UserProfile.svelte';
	import selectedClassStore from '$lib/stores/selectedClassStore.js';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data;
	let { user, nextExp, title, currExp } = data;
	let actions = data.actions;

	selectedClassStore.subscribe((value) => {
		onClassChange(value);
	});

	async function onClassChange(selectedClass: number) {
		try {
			const response = await fetch(`/api/actions?userId=${user.id}&classId=${selectedClass}`);
			const data = await response.json();
			// actions.doneAt here is a string because of the way the data is being sent from the server
			// convert doneAt to Date object
			data.forEach((action: any) => {
				action.doneAt = new Date(action.doneAt);
			});
			actions = data;
			$page.url.searchParams.set('classId', selectedClass.toString());
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
	<UserProfile {user} {nextExp} {currExp} {title} />

	<div class="mt-5">
		<h2 class="h2 text-3xl font-bold">Recent Activities</h2>
		{#if actions}
			<UserActivitiyList actionList={actions} />
		{/if}
	</div>
</section>
