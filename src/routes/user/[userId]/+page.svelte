<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import UserActivitiyList from '$lib/components/actionList/UserActivitiyList.svelte';
	import { Select, Heading, P } from 'flowbite-svelte';

	export let data;
	let { user, classes } = data;
	let actions = data.actions;

	// let selectedClass = $page.url.searchParams.get('classId') || classProp[0].value;

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
			// $page.url.searchParams.set('classId', selectedClass);
			// goto(`./${user.id}?${$page.url.searchParams.toString()}`, { invalidateAll: true });
		} catch {
			throw new Error('Failed to fetch user actions');
		}
	}
</script>

<section class="mx-auto w-[900px]">
	<div class=" flex items-center">
		<div class="m-7 h-max">
			<img class="rounded-full" src="https://placekitten.com/200/200" alt="" />
		</div>
		<div>
			<Heading class="mb-3">{user.username}</Heading>
			<Heading tag="h3">{user.exp} Points</Heading>
			<div></div>
		</div>
	</div>

	<div class="mt-5">
		<Select
			class="my-3"
			items={classProp}
			bind:value={selectedClass}
			on:change={onClassChange}
			placeholder=""
		/>
		<Heading tag="h2">Recent Activities</Heading>
		{#if actions}
			<UserActivitiyList actionList={actions} />
		{/if}
	</div>
</section>
