<script lang="ts">
	import { enhance } from '$app/forms';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const actionId = $modalStore[0]?.meta?.actionId;

	const onSubmit: SubmitFunction = () => {
		modalStore.close();

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const t: ToastSettings = {
					message: `Action have been deleted`,
					background: 'variant-success'
				};
				toastStore.trigger(t);
			} else if (result.type === 'error') {
				const t: ToastSettings = {
					message: `Failed to delete actions`,
					background: 'variant-error'
				};
				toastStore.trigger(t);
			}

			await update();
		};
	};
</script>

{#if $modalStore[0]}
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this actvity?
		</h3>
		<form method="POST" action="?/removeAsg" use:enhance={onSubmit}>
			<input type="hidden" name="asgId" value={actionId} />
			<button type="submit" class="btn me-2">Yes, I'm sure</button>
		</form>
	</div>
{/if}
