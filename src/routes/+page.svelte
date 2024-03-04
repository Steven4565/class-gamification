<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import type { ActivityProp } from '$lib/types/activity.js';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { error, type SubmitFunction } from '@sveltejs/kit';

	export let data;
	let {
		props: { actions },
		classes,
		userId
	} = data;

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

	let selectedClass = classes[0].classId.toString();
	const classProp = classes.map((c) => {
		return {
			value: c.classId.toString(),
			name: c.class.name
		};
	});

	const onActionClicked = (event: CustomEvent<{ action: ActivityProp }>) => {
		selectedAction = event.detail.action;

		const modal: ModalSettings = {
			type: 'component',
			component: 'confirmModal',
			meta: {
				selectedAction,
				selectedClass,
				onFormSubmit
			}
		};
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

	async function onClassChange() {
		try {
			const response = await fetch(`/api/getActivities?classId=${selectedClass}&userId=${userId}`);
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

<div>
	<select bind:value={selectedClass} on:change={onClassChange}>
		{#each classProp as _class}
			<option value={_class.value}>{_class.name}</option>
		{/each}
	</select>

	<h2 class="m-5 text-center">Activities</h2>
	<div class="flex items-center justify-center gap-10">
		{#if activities}
			{#each activities as activity}
				<ActionButton action={activity} on:actionClicked={onActionClicked} />
			{/each}
		{/if}
	</div>

	<h2 class="m-5 text-center">Quests</h2>
	<div class="flex items-center justify-center gap-10">
		{#if quests}
			{#each quests as quest}
				<ActionButton action={quest} on:actionClicked={onActionClicked} />
			{/each}
		{/if}
	</div>
</div>
