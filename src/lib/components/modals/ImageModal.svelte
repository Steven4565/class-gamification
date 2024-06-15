<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const selectedAction = $modalStore[0]?.meta?.selectedAction;
	const selectedClass = $modalStore[0]?.meta?.selectedClass;
	const onFormSubmit = $modalStore[0]?.meta?.onFormSubmit;

	let urlInput: string;
</script>

{#if $modalStore[0]}
	<div class="min-w-20 rounded-md bg-white p-4 shadow-md shadow-[#979797]">
		<form method="post" action="?/submitAction" use:enhance={onFormSubmit} class="bg-white p-5">
			<h3 class="h3 py-5 font-bold">Input proof to submit</h3>
			<input class="input" type="hidden" name="actionId" value={selectedAction?.id} />
			<input class="input" type="hidden" name="classId" value={selectedClass} />
			<input
				class="input my-3 border-slate-500 bg-slate-200 px-4 py-2"
				type="text"
				name="url"
				bind:value={urlInput}
			/>

			<div class="flex items-center justify-center">
				<button
					class="variant-outline btn bg-primary-400 text-white"
					type="submit"
					disabled={!urlInput}>Submit</button
				>
				<button
					class="variant-filled btn"
					on:click={() => {
						if ($modalStore[0].response) $modalStore[0].response(urlInput);
						modalStore.close();
					}}>Cancel</button
				>
			</div>
		</form>
	</div>
{/if}
