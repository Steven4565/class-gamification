<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	const pageNumber = handler.getPageNumber();
	const pageCount = handler.getPageCount();
	const pages = handler.getPages({ ellipsis: true });

	const arrowButtonStyle = 'btn h-10 rounded bg-gray-300 px-2 hover:brightness-110';
</script>

<section class="rounded-none">
	<button
		type="button"
		class={arrowButtonStyle}
		class:disabled={$pageNumber === 1}
		on:click={() => handler.setPage('previous')}
	>
		<svg
			class="h-3 w-3 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="3"
				d="m15 19-7-7 7-7"
			/>
		</svg>
	</button>
	{#each $pages as page}
		<button
			type="button"
			class="!hover:brightness-110 btn h-10 rounded px-3 text-center transition-colors {$pageNumber ===
			page
				? 'bg-secondary-500 text-white'
				: 'bg-white'}"
			class:active={$pageNumber === page}
			class:ellipse={page === null}
			on:click={() => handler.setPage(page)}
		>
			{page ?? '...'}
		</button>
	{/each}
	<button
		type="button"
		class={arrowButtonStyle}
		class:disabled={$pageNumber === $pageCount}
		on:click={() => handler.setPage('next')}
	>
		<svg
			class="m-0 h-3 w-3 p-0 text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="3"
				d="m9 5 7 7-7 7"
			/>
		</svg>
	</button>
</section>
