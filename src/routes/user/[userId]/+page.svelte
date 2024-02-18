<script lang="ts">
	import UserActivitiyList from '$lib/components/actionList/UserActivitiyList.svelte';
	import { Select, Heading } from 'flowbite-svelte';

	export let data;
	$: ({ user, actions, classProp } = data);

	let selectedClass = 0;

	async function onClassChange() {
		try {
			const response = await fetch(`/api/getActivities?classId=${selectedClass}&userId=${user.id}`);
			const data = await response.json();
			actions = data.activities;
		} catch {
			throw new Error('Failed to fetch activities');
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
			<div>
				<!-- TODO: input tags here -->
			</div>
		</div>
	</div>

	<div class="mt-5">
		<Select class="my-3" items={classProp} bind:value={selectedClass} on:change={onClassChange} />
		<Heading tag="h2">Recent Activities</Heading>
		<UserActivitiyList actionList={actions} />
	</div>
</section>
