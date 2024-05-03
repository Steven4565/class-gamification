<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import UserActivitiyList from '$lib/components/actionList/UserActivitiyList.svelte';
	import selectedClassStore from '$lib/stores/selectedClassStore.js';
	import { Avatar, getToastStore, ProgressBar, type ToastSettings } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let data;
	let { user, classes } = data;
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
	<div class=" flex items-center">
		<div class="m-7 h-max">
			<Avatar
				initials="US"
				width="w-32"
				background="bg-surface-800"
				src="https://cdn.discordapp.com/avatars/322362818982707210/08c1e2a6eb0148f4f6cc9caa877ec668.webp?size=100"
			/>
		</div>
		<div class="w-full">
			<div class="flex w-full justify-between">
				<div>
					<h1 class="h1 text-2xl font-bold">{user.username}</h1>
					<p class="p">{user.id}</p>
				</div>
				<h3 class="h3 text-3xl font-bold text-primary-500">{user.exp} POINTS</h3>
			</div>
			<div class="flex items-center justify-center gap-3">
				<ProgressBar
					label="Progress Bar"
					value={user.exp}
					max={100}
					height="h-5"
					track="bg-surface-600"
				/>
				<span class="font-bold">{user.exp}/100</span>
			</div>
		</div>
	</div>

	<div class="mt-5">
		<h2 class="h2 text-3xl font-bold">Recent Activities</h2>
		{#if actions}
			<UserActivitiyList actionList={actions} />
		{/if}
	</div>
</section>
