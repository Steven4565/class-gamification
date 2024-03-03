
<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const selectedData = $modalStore[0]?.meta?.selectedData;
	const type = $modalStore[0]?.meta?.type;

	const onSubmit: SubmitFunction = () => {
		modalStore.close();

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const t: ToastSettings = {
					message: `Class has been removed`,
					background: 'variant-success'
				};
				toastStore.trigger(t);
			} else if (result.type === 'error') {
				const t: ToastSettings = {
					message: `Failed to remove class`,
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
			Are you sure you want to {type} this class?
		</h3>
		<form method="POST" action="?/removeClass" use:enhance={onSubmit}>
			<input type="hidden" name="id" value={selectedData?.id} />
			<Button type="submit" color="red" class="me-2">Yes, I'm sure</Button>
			<Button color="alternative" on:click={() => modalStore.close()}>No, cancel</Button>
		</form>
	</div>
{/if}
