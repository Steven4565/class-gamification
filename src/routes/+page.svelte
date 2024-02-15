<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import ActionSuccessToast from '$lib/components/toasts/ActionSuccessToast.svelte';
	import type { ActivityProp } from '$lib/types/activity.js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Heading } from 'flowbite-svelte';

	export let data;
	let { activities } = data.props;

	let openToast = false;

	let openModal = false;
	let selectedActivity: ActivityProp | null = null;

	const onActionClicked = (event: CustomEvent<{ activity: ActivityProp }>) => {
		selectedActivity = event.detail.activity;
		openModal = true;
	};

	const onFormSubmit: SubmitFunction = async (event) => {
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
</script>

<div>
	<Heading tag="h2" class="m-5 text-center">Activities</Heading>
	<div class="flex items-center justify-center gap-10">
		{#each activities as activity}
			<ActionButton {activity} on:actionClicked={onActionClicked} />
		{/each}
	</div>
	<ConfirmModal bind:openModal bind:selectedActivity {onFormSubmit} />
	<div class="fixed bottom-0 right-0 mb-10 mr-10">
		<ActionSuccessToast bind:openToast />
	</div>
</div>
