<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	const rowsPerPage = handler.getRowsPerPage();
	const options = [5, 10, 15];
</script>

<aside class="flex place-items-center pr-3">
	Display
	<select
		class="select ml-3 rounded-md border-solid border-gray-400 px-1 py-1 text-sm"
		bind:value={$rowsPerPage}
	>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
</aside>
