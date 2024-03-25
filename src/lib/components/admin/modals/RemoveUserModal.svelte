<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { SvelteComponent } from 'svelte';

	export let parent: SvelteComponent;

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const selectedData = $modalStore[0]?.meta?.selectedData;

	const onSubmit: SubmitFunction = () => {
		modalStore.close();

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const t: ToastSettings = {
					message: `${selectedData.user.id} has been removed`,
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
	const cButton = 'p-3 mt-5 mx-1 rounded-full font-poppins font-semibold text-xs text-white mx-auto bg-opacity-90 hover:bg-opacity-100'
</script>


{#if $modalStore[0]}

	<div class="text-center bg-lavenderMist drop-shadow-md shadow-inner rounded-lg py-8 w-full max-w-md px-2">
		<h3 class="{cFont} font-bold text-xl">
			DELETE CONFIRMATION
		</h3>
		<h3 class="{cFont} font-medium mt-px">
			Are you sure you want to delete {selectedData.user.id}?
		</h3>
		<form method="POST" action="?/removeUser" use:enhance={onSubmit}>
			<input type="hidden" name="id" value={selectedData?.id} />
			<button type="submit" class="{cButton} bg-red-500 hover:bg-red-600">Yes, I'm sure</button>
			<button type="reset" class="{cButton} bg-customBlue" on:click={parent.onClose}>No, cancel</button>
		</form>
	</div>
{/if}
