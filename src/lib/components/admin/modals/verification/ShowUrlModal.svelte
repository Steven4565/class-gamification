<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { SvelteComponent } from 'svelte';

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	const url = $modalStore[0]?.meta?.url;
</script>

{#if $modalStore[0]}
	<div class="w-full max-w-lg rounded-lg bg-lavenderMist p-10 shadow-inner drop-shadow-md">
		<a href={url} target="_blank" class="anchor text-xl"> Open proof </a>

		<form action="?/invalidate" method="post">
			<button type="submit" class="btn bg-red-500 p-3 font-bold text-white"> Invalidate </button>
		</form>
	</div>
{/if}
