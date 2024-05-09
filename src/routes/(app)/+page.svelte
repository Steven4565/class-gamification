<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import selectedClassStore from '$lib/stores/selectedClassStore.js';
	import type { ActivityProp } from '$lib/types/activity.js';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { type SubmitFunction } from '@sveltejs/kit';
	import { get } from 'svelte/store';

	export let data;
	let { actions, userId } = data;

	$: quests = actions.filter((action) => action.resetTime === 'semester');
	$: activities = actions.filter((action) => action.resetTime === 'weekly');

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const successToast = {
		type: 'success',
		message: 'Activity submitted successfully',
		background: 'variant-filled-success'
	};
	const failToast = {
		type: 'error',
		message: 'Failed to submit activity',
		background: 'variant-filled-error'
	};

	let selectedAction: ActivityProp | null = null;
	const onActionClicked = (event: CustomEvent<{ action: ActivityProp }>) => {
		selectedAction = event.detail.action;

		let modal: ModalSettings;
		if (selectedAction.group.name == 'imageSemester') {
			modal = {
				type: 'component',
				component: 'imageModal',
				response: (r: boolean | undefined) => console.log('response:', r)
			};
		} else {
			modal = {
				type: 'component',
				component: 'confirmModal',
				meta: {
					selectedAction,
					selectedClass: get(selectedClassStore),
					onFormSubmit
				}
			};
		}

		modalStore.trigger(modal);
	};

	const onFormSubmit: SubmitFunction = async () => {
		modalStore.close();

		return async ({ result, update }) => {
			if (result.type === 'success' && selectedAction) {
				actions.forEach((action) => {
					if (selectedAction !== null && action.id === selectedAction.id) {
						action.quota++;
						actions = actions;
					}
				});
				toastStore.trigger(successToast);
			} else if (result.type === 'error') {
				toastStore.trigger(failToast);
			}
			await update();
		};
	};

	selectedClassStore.subscribe((value) => {
		onClassChange(value);
	});

	async function onClassChange(classId: number) {
		try {
			const response = await fetch(`/api/getActivities?classId=${classId}&userId=${userId}`);
			const data = await response.json();
			actions = data.activities;
		} catch {
			const t = {
				message: 'Failed to fetch actions',
				background: 'variant-filled-error'
			};
			toastStore.trigger(t);
		}
	}
</script>

<div class="mx-auto grid max-w-[80%] gap-10">
	<div>
		<h2 class="h2 m-5 text-2xl font-bold">ACTIVITIES</h2>
		<div class="flex w-full flex-wrap items-center gap-10">
			{#if activities}
				{#each activities as activity}
					<ActionButton action={activity} on:actionClicked={onActionClicked} />
				{/each}
			{/if}
		</div>
	</div>
	<div>
		<h2 class="h2 m-5 text-2xl font-bold">QUESTS</h2>
		<div class="flex max-w-full flex-wrap items-center gap-10">
			{#if quests}
				{#each quests as quest}
					<ActionButton action={quest} on:actionClicked={onActionClicked} />
				{/each}
			{/if}
		</div>
	</div>
</div>
