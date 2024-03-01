<script lang="ts">
	import { enhance } from '$app/forms';
	import { classActions } from '$lib/types/classData';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { Input, Label, Button } from 'flowbite-svelte';

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
		return async (option) => {
			await option.update();

			modalStore.close();

			// TODO: show toast
		};
	};
</script>

<form
	class="flex flex-col space-y-6"
	method="POST"
	action={formProps[action].formUrl}
	use:enhance={formControl}
>
	<Input type="hidden" name="id" value={selectedData?.id} />
	<h3 class="mb-2 text-2xl font-medium text-gray-900 dark:text-white">
		{formProps[action].label}
		class
	</h3>
	<div class="custom-grid">
		<span class="text-lg">Name</span>
		<span>:</span>
		<Label class="justify-left flex items-center">
			<Input
				type="text"
				name="name"
				required
				class="border-1 ml-2"
				color="base"
				value={selectedData?.name}
			/>
		</Label>
		<span class="text-lg">Description</span>
		<span>:</span>
		<Label class="justify-left flex items-center">
			<Input
				type="text"
				name="description"
				class="border-1 ml-2"
				color="base"
				value={selectedData?.description}
			/>
		</Label>
	</div>
	<Button
		type="submit"
		class="mx-auto w-fit rounded-md border-2 border-solid border-green-400 bg-lime-300 bg-opacity-15"
		color="none">Done</Button
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
