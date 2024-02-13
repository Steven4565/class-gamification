<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import TestModal from '$lib/components/modals/TestModal.svelte';
	import type { ActivityProp } from '$lib/types/activity.js';
	import { Button, Heading } from 'flowbite-svelte';
	import type { SubmitFunction } from './$types.js';

	export let data;
	let { activities } = data.props;

	let openModal = false;
	let selectedActivity: ActivityProp | null = null;

	const onActionClicked = (event: CustomEvent<{ activity: ActivityProp }>) => {
		selectedActivity = event.detail.activity;
		openModal = true;
		console.log({ openModal });
	};

	const onFormSubmit: SubmitFunction = async (event) => {
		console.log('form submitted');
		console.log(event);
	};

	let open = false;
</script>

<div>
	<Heading tag="h2" class="m-5 text-center">Activities</Heading>
	<div class="flex items-center justify-center gap-10">
		{#each activities as activity}
			<ActionButton {activity} on:actionClicked={onActionClicked} />
		{/each}
	</div>
	<ConfirmModal bind:openModal bind:selectedActivity onFormSubmit={() => {}} />
	<!-- <TestModal bind:open /> -->
	<Button
		on:click={() => {
			open = !open;
		}}>test</Button
	>
</div>
