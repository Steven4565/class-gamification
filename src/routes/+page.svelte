<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import ActionSuccessToast from '$lib/components/toasts/ActionSuccessToast.svelte';
	import type { ActivityProp } from '$lib/types/activity.js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Heading, Select } from 'flowbite-svelte';

	export let data;
	let {
		props: { activities },
		classes,
		userId
	} = data;

	let openToast = false;

	let openModal = false;
	let selectedActivity: ActivityProp | null = null;

	let selectedClass = classes[0].classId;
	const classProp = classes.map((c) => {
		return {
			value: c.classId,
			name: c.class.name
		};
	});

	const onActionClicked = (event: CustomEvent<{ activity: ActivityProp }>) => {
		selectedActivity = event.detail.activity;
		openModal = true;
	};

	// Handle activity submit
	const onFormSubmit: SubmitFunction = async () => {
		openModal = false;
		return async ({ result, update }) => {
			if (result.type === 'success' && selectedActivity) {
				activities.forEach((activity) => {
					if (selectedActivity !== null && activity.id === selectedActivity.id) {
						activity.quota++;
						activities = activities;
					}
				});
				openToast = true;
				setTimeout(() => {
					openToast = false;
				}, 3000);
			} else if (result.type === 'error') {
			}
			await update();
		};
	};

	async function onClassChange() {
		try {
			const response = await fetch(`/api/getActivities?classId=${selectedClass}&userId=${userId}`);
			const data = await response.json();
			activities = data.activities;
		} catch {
			throw new Error('Failed to fetch activities');
		}
	}
</script>

<div>
	<Select items={classProp} bind:value={selectedClass} on:change={onClassChange} />

	<Heading tag="h2" class="m-5 text-center">Activities</Heading>
	<div class="flex items-center justify-center gap-10">
		{#if activities}
			{#each activities as activity}
				<ActionButton {activity} on:actionClicked={onActionClicked} />
			{/each}
		{/if}
	</div>
	<ConfirmModal bind:openModal {selectedClass} {selectedActivity} {onFormSubmit} />
	<div class="fixed bottom-0 right-0 mb-10 mr-10">
		<ActionSuccessToast bind:openToast />
	</div>
</div>
