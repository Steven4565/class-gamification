<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	const pageNumber = handler.getPageNumber();
	const pageCount = handler.getPageCount();
	const pages = handler.getPages({ ellipsis: true });
</script>

<section class="rounded-none">
	<button
		type="button"
		class="px-2 h-10 rounded-sm bg-gray-300"
		class:disabled={$pageNumber === 1}
		on:click={() => handler.setPage('previous')}
	>
    <svg class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m15 19-7-7 7-7"/>
      </svg>
      
	</button>
	{#each $pages as page}
		<button
			type="button"
			class="text-center rounded px-3 h-10 hover:variant-soft-primary transition-colors { $pageNumber === page ? 'bg-secondary-500 text-white' : 'bg-white' }"
			class:active={$pageNumber === page}
			class:ellipse={page === null}
			on:click={() => handler.setPage(page)}
		>
			{page ?? '...'}
		</button>
	{/each}
	<button
		type="button"
		class="px-2 h-10 rounded bg-gray-300 hover:variant-soft-primary"
		class:disabled={$pageNumber === $pageCount}
		on:click={() => handler.setPage('next')}
	>
    <svg class="w-3 h-3 text-gray-800 dark:text-white m-0 p-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m9 5 7 7-7 7"/>
      </svg>
      
	</button>
</section>
