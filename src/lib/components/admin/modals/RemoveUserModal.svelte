<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { SvelteComponent } from 'svelte';

	export let parent: SvelteComponent;

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	$: selectedData = $modalStore[0]?.meta?.selectedData;

	const onSubmit: SubmitFunction = () => {
		const userId = selectedData?.user.id;
		modalStore.close();

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const t: ToastSettings = {
					message: `${userId} has been removed`,
					background: 'variant-success'
				};
				toastStore.trigger(t);
			} else if (result.type === 'error') {
				const t: ToastSettings = {
					message: `Failed to remove user`,
					background: 'variant-error'
				};
				toastStore.trigger(t);
			}

			await update();
		};
	};

	const cFont = 'font-poppins dark:text-white cursor-default';
	const cButton =
		'p-3 mt-5 mx-1 rounded-full font-poppins font-semibold text-xs text-white mx-auto bg-opacity-90 hover:bg-opacity-100';
</script>

{#if $modalStore[0]}
	<div
		class="w-full max-w-md rounded-lg bg-lavenderMist px-2 py-8 text-center shadow-inner drop-shadow-md"
	>
		<h3 class="{cFont} text-xl font-bold">DELETE CONFIRMATION</h3>
		<h3 class="{cFont} mt-px font-medium">
			Are you sure you want to delete {selectedData.user.id}?
		</h3>
		<form method="POST" action="?/removeUser" use:enhance={onSubmit}>
			<input type="hidden" name="id" value={selectedData?.id} />
			<button type="submit" class="{cButton} bg-red-500 hover:bg-red-600">Yes, I'm sure</button>
			<button type="reset" class="{cButton} bg-customBlue" on:click={parent.onClose}>
				No, cancel
			</button>
		</form>
	</div>
{/if}
