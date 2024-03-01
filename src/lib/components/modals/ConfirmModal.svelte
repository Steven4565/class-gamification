<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActivityProp } from '$lib/types/activity';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let openModal = false;
	export let onFormSubmit: SubmitFunction;
	export let selectedAction: ActivityProp | null;
	export let selectedClass: number;
</script>

<form method="post" action="?/submitAction" use:enhance={onFormSubmit}>
	<h3>Are you sure you want to submit for {selectedAction?.name ?? ''}?</h3>
	<input class="input" type="hidden" name="actionId" value={selectedAction?.id} />
	<input class="input" type="hidden" name="classId" value={selectedClass} />

	<div class="flex items-center justify-center">
		<button class="btn" type="submit">Submit</button>
		<button
			class="btn"
			color="alternative"
			on:click={() => {
				openModal = false;
			}}>Cancel</button
		>
	</div>
</form>
