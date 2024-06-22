<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const url = $modalStore[0]?.meta?.url;
</script>

{#if $modalStore[0]}
	<div class="w-full max-w-lg rounded-lg bg-lavenderMist p-10 shadow-inner drop-shadow-md">
		<a href={url} target="_blank" class="anchor text-xl"> Open proof </a>
	</div>
{/if}
