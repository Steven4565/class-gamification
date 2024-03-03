<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Label, Textarea } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const onSubmit: SubmitFunction = () => {
		modalStore.close();

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const t: ToastSettings = {
					message: `Users have been added`,
					background: 'variant-success'
				};
				toastStore.trigger(t);
			} else if (result.type === 'error') {
				const t: ToastSettings = {
					message: `Failed to add users`,
					background: 'variant-error'
				};
				toastStore.trigger(t);
			}

			await update();
		};
	};
</script>

{#if $modalStore[0]}
	<form class="flex flex-col space-y-3" method="POST" action="?/addStudent" use:enhance={onSubmit}>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Add Student</h3>
		<Label class="space-y-2">
			<span>NIM</span>
			<Textarea type="text" name="studentId" rows="3" class="flex h-fit text-wrap" />
		</Label>
		<Button type="submit" class="w-full1">Add</Button>
	</form>
{/if}
