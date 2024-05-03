<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const selectedAction = $modalStore[0]?.meta?.selectedAction;
	const selectedClass = $modalStore[0]?.meta?.selectedClass;
	const onFormSubmit = $modalStore[0]?.meta?.onFormSubmit;
</script>

{#if $modalStore[0]}
	<div class="min-w-20 p-4 bg-white rounded-md shadow-md shadow-[#979797]">
		<form method="post" action="?/submitAction" use:enhance={onFormSubmit}>
			<div class="flex justify-end">
				<button style="background: none; border: none; outline: none;" on:click={() => { modalStore.close(); }}>
					<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 18 17.94 6M18 18 6.06 6"/>
					</svg>
				</button>
			</div>
			<div class="items-center justify-center text-center px-8 pt-1 pb-4">
				<h1 class="font-bold text-2xl">SUBMISSION CONFIRMATION</h1>
				<div class="flex justify-center">
					<h3 class="font-medium text-wrap w-4/5">Are you sure you want to submit for {selectedAction?.name ?? ''}?</h3>
					<input class="input" type="hidden" name="actionId" value={selectedAction?.id} />
				<input class="input" type="hidden" name="classId" value={selectedClass} />
				</div>
				
				<div class="flex items-center justify-center pt-6">
					<button class="btn bg-primary-400 py-3 px-10 text-white rounded-2xl font-bold hover:bg-primary-500 hover:drop-shadow-md text-xl" type="submit">SUBMIT</button>
				</div>
			</div>
		</form>
	</div>
{/if}
