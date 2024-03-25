<script lang="ts">
	import { enhance } from '$app/forms';
	import { classActions } from '$lib/types/classData';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { CloseSolid } from 'flowbite-svelte-icons';
	import type { SvelteComponent } from 'svelte';
	
	export let parent: SvelteComponent;

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const selectedData = $modalStore[0]?.meta?.selectedData;
	const action = selectedData ? classActions.edit : classActions.create;

	const formProps = {
		[classActions.create]: {
			formUrl: '?/addClass',
			label: 'CREATE'
		},
		[classActions.edit]: {
			formUrl: '?/updateClass',
			label: 'EDIT'
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

	const cFormFont = 'font-poppins font-medium text-sm dark:text-white cursor-default'
	const cFormInput = 'input bg-silvers ml-1 px-2 py-1 drop-shadow-md shadow-inner border-none rounded-md font-poppins font-medium text-sm'
</script>

{#if $modalStore[0]}
	<div class="bg-lavenderMist drop-shadow-md shadow-inner rounded-lg p-2 w-full max-w-lg">
		<div class="flex justify-end w-full">
			<CloseSolid strokeWidth="4" class="w-6 cursor-pointer focus:outline-none" on:click={parent.onClose}/>
		</div>
		<div class="flex flex-col items-center mx-12">
			<h3 class="text-xl font-poppins font-bold dark:text-white cursor-default">
				{formProps[action].label} CLASS
			</h3>
			<form
				class="flex flex-col space-y-6 w-full mb-4"
				method="POST"
				action={formProps[action].formUrl}
				use:enhance={formControl}
			>
				<input type="hidden" name="id" value={selectedData?.id} />
				<div class="form-grid">
					<span class="{cFormFont}">Name</span>
					<label class="justify-left label flex items-center">
						<input
							type="text"
							name="name"
							required
							class="{cFormInput}"
							color="base"
							maxlength="13"
							value={selectedData?.name ?? ''}
						/>
					</label>
					<span class="{cFormFont}">Description</span>
					<label class="justify-left label flex items-center">
						<input
							type="text"
							name="description"
							class="{cFormInput}"
							color="base"
							maxlength="19"
							value={selectedData?.description ?? ''}
						/>
					</label>
				</div>
				<button
					type="submit"
					class="w-1/3 py-3 rounded-full bg-electricCyan font-poppins font-semibold text-xs text-white mx-auto bg-opacity-90 hover:bg-opacity-100"
					color="none">DONE</button
				>
			</form>
		</div>
	</div>
{/if}
