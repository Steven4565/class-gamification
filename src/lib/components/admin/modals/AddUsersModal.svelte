<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { CloseSolid } from 'flowbite-svelte-icons';
	import type { SvelteComponent } from 'svelte';

	export let parent: SvelteComponent;

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

	const cButton = 'font-poppins font-bold text-white px-3.5 py-1.5 rounded-xl'
</script>

{#if $modalStore[0]}
	<div class="flex flex-col items-center bg-white drop-shadow-md shadow-md rounded-lg p-3.5 pb-6 w-full max-w-lg">
		<div class="flex justify-end w-full">
			<CloseSolid strokeWidth="4" class="w-6 cursor-pointer focus:outline-none" on:click={parent.onClose}/>
		</div>
		<form class="flex flex-col items-center justify-center w-10/12 gap-y-5" method="post" action="?/addStudent" use:enhance={onSubmit}>
			<p class="font-poppins font-bold text-xl">ADD STUDENT</p>
			<textarea class="w-full bg-[#00BCF1] bg-opacity-10 font-poppins p-3.5 rounded-md" name="studentId" rows="5" placeholder="Input NIM" />
			<div class="flex justify-evenly w-full">
				<button class="{cButton} bg-sunriseOrange bg-opacity-75" disabled>UPLOAD</button>
				<button type="submit" class="{cButton} bg-electricCyan">SUMBIT</button>
			</div>
		</form>
	</div>
{/if}
