<script lang="ts">
	import { enhance } from '$app/forms';
	import { classActions } from '$lib/types/classData';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const selectedData = $modalStore[0]?.meta?.selectedData;
	const action = selectedData ? classActions.edit : classActions.create;

	const formProps = {
		[classActions.create]: {
			formUrl: '?/addClass',
			label: 'Create'
		},
		[classActions.edit]: {
			formUrl: '?/updateClass',
			label: 'Edit'
		}
	};

	const formControl: SubmitFunction = () => {
		modalStore.close();

		return async ({ result, update }) => {
			const pastTense = action === classActions.create ? 'created' : 'updated';

			if (result.type === 'success') {
				const t: ToastSettings = {
					message: `Class has been ${pastTense}`,
					background: 'variant-success'
				};
				toastStore.trigger(t);
			} else if (result.type === 'error') {
				const t: ToastSettings = {
					message: `Failed to ${pastTense} class`,
					background: 'variant-error'
				};
				toastStore.trigger(t);
			}

			await update();
		};
	};
</script>

<form
	class="flex flex-col space-y-6"
	method="POST"
	action={formProps[action].formUrl}
	use:enhance={formControl}
>
	<input type="hidden" name="id" value={selectedData?.id} />
	<h3 class="mb-2 text-2xl font-medium text-gray-900 dark:text-white">
		{formProps[action].label}
		class
	</h3>
	<div class="custom-grid">
		<span class="text-lg">Name</span>
		<span>:</span>
		<label class="justify-left label flex items-center">
			<input
				type="text"
				name="name"
				required
				class="border-1 input ml-2"
				color="base"
				value={selectedData?.name ?? ''}
			/>
		</label>
		<span class="text-lg">Description</span>
		<span>:</span>
		<label class="justify-left label flex items-center">
			<input
				type="text"
				name="description"
				class="border-1 input ml-2"
				color="base"
				value={selectedData?.description ?? ''}
			/>
		</label>
	</div>
	<button
		type="submit"
		class="variant-filled-success btn mx-auto w-fit rounded-md border-2 border-solid border-green-400 bg-lime-300 bg-opacity-15"
		color="none">Done</button
	>
</form>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: auto auto minmax(0, 1fr);
		row-gap: 1rem;
		column-gap: 0.5rem;
		align-items: center;
	}
</style>
