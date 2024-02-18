<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActivityProp } from '$lib/types/activity';
	import type { SubmitFunction } from '@sveltejs/kit';

	import { Button, Heading, Modal } from 'flowbite-svelte';

	export let openModal = false;
	export let onFormSubmit: SubmitFunction;
	export let selectedActivity: ActivityProp | null;
	export let selectedClass: number;
</script>

<Modal bind:open={openModal}>
	<form method="post" action="?/submitAction" use:enhance={onFormSubmit}>
		<Heading tag="h3">Are you sure you want to submit for {selectedActivity?.name ?? ''}?</Heading>
		<input type="hidden" name="actionId" value={selectedActivity?.id} />
		<input type="hidden" name="classId" value={selectedClass} />

		<div class="flex items-center justify-center">
			<Button type="submit">Submit</Button>
			<Button
				color="alternative"
				on:click={() => {
					openModal = false;
				}}>Cancel</Button
			>
		</div>
	</form>
</Modal>
