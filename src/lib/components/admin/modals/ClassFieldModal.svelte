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

	$: selectedData = $modalStore[0]?.meta?.selectedData;
	$: action = selectedData ? classActions.edit : classActions.create;

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
		const pastTense = action === classActions.create ? 'created' : 'updated';
		modalStore.close();

		return async ({ result, update }) => {
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

	const cFormFont = 'font-poppins font-medium text-sm dark:text-white cursor-default';
	const cFormInput =
		'input bg-silvers ml-1 px-2 py-1 drop-shadow-md shadow-inner border-none rounded-md font-poppins font-medium text-sm';
</script>

{#if $modalStore[0]}
	<div class="w-full max-w-lg rounded-lg bg-lavenderMist p-2 shadow-inner drop-shadow-md">
		<div class="flex w-full justify-end">
			<CloseSolid
				strokeWidth="4"
				class="w-6 cursor-pointer focus:outline-none"
				on:click={parent.onClose}
			/>
		</div>
		<div class="mx-12 flex flex-col items-center">
			<h3 class="cursor-default font-poppins text-xl font-bold dark:text-white">
				{formProps[action].label} CLASS
			</h3>
			<form
				class="mb-4 flex w-full flex-col space-y-6"
				method="POST"
				action={formProps[action].formUrl}
				use:enhance={formControl}
			>
				<input type="hidden" name="id" value={selectedData?.id} />
				<div class="form-grid">
					<span class={cFormFont}>Name</span>
					<label class="justify-left label flex items-center">
						<input
							type="text"
							name="name"
							required
							class={cFormInput}
							color="base"
							maxlength="13"
							value={selectedData?.name ?? ''}
						/>
					</label>
					<span class={cFormFont}>Description</span>
					<label class="justify-left label flex items-center">
						<input
							type="text"
							name="description"
							class={cFormInput}
							color="base"
							maxlength="19"
							value={selectedData?.description ?? ''}
						/>
					</label>
				</div>
				<button
					type="submit"
					class="mx-auto w-1/3 rounded-full bg-electricCyan bg-opacity-90 py-3 font-poppins text-xs font-semibold text-white hover:bg-opacity-100"
					color="none">DONE</button
				>
			</form>
		</div>
	</div>
{/if}
