<script lang="ts">
	import { enhance } from '$app/forms';
	import { FileDropzone, getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const selectedAction = $modalStore[0]?.meta?.message;
	const selectedClass = $modalStore[0]?.meta?.selectedClass;
	const onFormSubmit = $modalStore[0]?.meta?.onFormSubmit;

	let file: FileList;
	$: console.log(file);
</script>

{#if $modalStore[0]}
	<div class="min-w-20">
		<form method="post" action="?/submitAction" use:enhance={onFormSubmit} class="bg-white p-5">
			<h3 class="h3 py-5">Input proof to submit</h3>
			<input class="input" type="hidden" name="actionId" value={selectedAction?.id} />
			<input class="input" type="hidden" name="classId" value={selectedClass} />

			<FileDropzone name="files" class="my-5" bind:files={file}>
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<svelte:fragment slot="message">Drag image here</svelte:fragment>
				<svelte:fragment slot="meta">Supported files: .png, .jpeg, .jpg</svelte:fragment>
			</FileDropzone>

			<div class="flex items-center justify-center">
				<button class="variant-outline btn" type="submit" disabled={!file}>Submit</button>
				<button
					class="variant-filled btn"
					on:click={() => {
						if ($modalStore[0].response) $modalStore[0].response(file);
						modalStore.close();
					}}>Cancel</button
				>
			</div>
		</form>
	</div>
{/if}
