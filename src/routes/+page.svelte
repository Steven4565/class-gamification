<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import type { ActivityProp } from '$lib/types/activity.js';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Activity, Button, Heading } from 'flowbite-svelte';

	export let data;
	let { activities } = data.props;

	let openModal = false;
	let selectedActivity: ActivityProp | null = null;

	const onActionClicked = (event: CustomEvent<{ activity: ActivityProp }>) => {
		selectedActivity = event.detail.activity;
		openModal = true;
	};

	const onFormSubmit: SubmitFunction = async (event) => {
		return async ({ result, update }) => {
			openModal = false;
			if (result.type === 'success' && selectedActivity) {
				activities.forEach((activity) => {
					if (selectedActivity !== null && activity.id === selectedActivity.id) {
						activity.quota++;
						activities = activities;
					}
				});
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
</div>
