<script lang="ts">
	import { enhance } from '$app/forms';
	import ActionButton from '$lib/components/ActionButton.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import ActionSuccessToast from '$lib/components/toasts/ActionSuccessToast.svelte';
	import type { ActivityProp } from '$lib/types/activity.js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Heading, Select } from 'flowbite-svelte';

	export let data;
	let {
		props: { activities },
		classes
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

	// Handle class change
	let form: HTMLFormElement | null = null;
	function handleClassChange() {
		selectedClass = selectedClass;

		if (!form) return;
		form.requestSubmit();
	}
	$: selectedClass, handleClassChange();

	const onClassSubmit: SubmitFunction = async () => {
		return async ({ result, update }) => {
			if (result.type === 'success') {
				activities = result.data?.activities;
			} else if (result.type === 'error') {
			}
			await update();
		};
	};
</script>

<div>
	<form bind:this={form} action="?/changeClass" method="post" use:enhance={onClassSubmit}>
		<Select items={classProp} name="classId" bind:value={selectedClass} />
	</form>
	<Heading tag="h2" class="m-5 text-center">Activities</Heading>
	<div class="flex items-center justify-center gap-10">
		{#each activities as activity}
			<ActionButton {activity} on:actionClicked={onActionClicked} />
		{/each}
	</div>
	<ConfirmModal bind:openModal {selectedClass} {selectedActivity} {onFormSubmit} />
	<div class="fixed bottom-0 right-0 mb-10 mr-10">
		<ActionSuccessToast bind:openToast />
	</div>
</div>
