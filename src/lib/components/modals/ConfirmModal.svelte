<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const selectedAction = $modalStore[0]?.meta?.selectedAction;
	const selectedClass = $modalStore[0]?.meta?.selectedClass;
	const onFormSubmit = $modalStore[0]?.meta?.onFormSubmit;
</script>

{#if $modalStore[0]}
	<div class="min-w-20">
		<form method="post" action="?/submitAction" use:enhance={onFormSubmit}>
			<h3>Are you sure you want to submit for {selectedAction?.name ?? ''}?</h3>
			<input class="input" type="hidden" name="actionId" value={selectedAction?.id} />
			<input class="input" type="hidden" name="classId" value={selectedClass} />

			<div class="flex items-center justify-center">
				<button class="variant-outline btn" type="submit">Submit</button>
				<button
					class="variant-filled btn"
					on:click={() => {
						modalStore.close();
					}}>Cancel</button
				>
			</div>
		</form>
	</div>
{/if}
