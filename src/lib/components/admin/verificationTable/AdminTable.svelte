<script lang="ts">
	import { DataHandler } from '@vincjo/datatables';
	import ThSort from '$lib/components/admin/verificationTable/ThSort.svelte';
	import Pagination from '$lib/components/admin/verificationTable/Pagination.svelte';
	import RowsPerPage from '$lib/components/admin/verificationTable/RowsPerPage.svelte';
	import { studentActivityDownloadExcel } from '$lib/utils/exportToExcel';
	import { getModalStore, getToastStore, popup } from '@skeletonlabs/skeleton';
	import type { ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import type { RowTableUserActivity, TableUserActivity } from '$lib/types/verificationTable';
	import { unknown } from 'zod';

	let checkedStates: { [key: number]: boolean } = {};

	export let userAct: TableUserActivity[];

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const userList: RowTableUserActivity[] = userAct.map((item) => {
		const mappedItem: RowTableUserActivity = {
			id: item.id,
			username: item.user.username,
			actionTypeName: item.actionType.name,
			doneAt: item.doneAt.toDateString() + ' ' + item.doneAt.toLocaleTimeString(),
			valid: item.valid,
			proof: null
		};

		if (item.actionType.group.name == 'imageSemester') {
			mappedItem.proof = item.attributeMap;
		}

		return mappedItem;
	});

	const handler = new DataHandler(userList, { rowsPerPage: 10 });
	const rows = handler.getRows();
	let searchValue: string;
	const rowCount = handler.getRowCount();

	function toggleCheckbox(id: number) {
		checkedStates[id] = !checkedStates[id];
	}

	onMount(() => {
		userList.forEach((row) => {
			checkedStates[row.id] = true;
		});
	});

	function toggleSelectAll() {
		const selectAllCheckbox = document.querySelector('.select-all') as HTMLInputElement;
		const checkboxes = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;

		checkboxes.forEach((checkbox) => {
			checkbox.checked = selectAllCheckbox.checked;
			const id = parseInt(checkbox.value);
			checkedStates[id] = selectAllCheckbox.checked;
		});
	}

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'bottom'
	};

	function extractValue(input: unknown): string[] | undefined {
		// Check if input is an array
		if (Array.isArray(input)) {
			let values: string[] = [];

			for (const item of input) {
				// Check if the item is an object and has a property 'value' of type string
				if (typeof item === 'object' && item !== null && 'value' in item) {
					const value = (item as { value: unknown }).value;
					if (typeof value === 'string') {
						values.push(value);
					}
				}
			}

			return values.length > 0 ? values : undefined;
		}
		return undefined;
	}

	function onShowImageProof(value: unknown) {
		const processed = extractValue(value);
		if (!processed) throw new Error('Failed fetching url');

		const url = processed[0];
		const modal: ModalSettings = {
			type: 'component',
			title: 'Check Url Proof',
			component: 'showUrlModal',
			meta: {
				url
			}
		};
		modalStore.trigger(modal);
	}
</script>

<div>
	<div class="flex justify-between">
		<div class="flex gap-2">
			<input
				class="input w-40 border-solid border-primary-400 py-1 pl-3 text-base"
				type="search"
				placeholder="Search"
				bind:value={searchValue}
				on:input={() => handler.search(searchValue)}
			/>

			<button class="btn bg-primary-500 py-1 text-white" use:popup={popupFeatured}>
				<span class="inline-flex items-center text-base">
					Activities
					<svg
						class="h-6 w-6 pl-2 text-white dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							fill-rule="evenodd"
							d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
							clip-rule="evenodd"
						/>
					</svg>
				</span>
			</button>

			<div class="card w-72 p-4 shadow-xl" data-popup="popupFeatured">
				<!-- TODO: -->
				<div><p>Demo Content</p></div>
				<div class="bg-surface-100-800-token arrow" />
			</div>
		</div>

		<div>
			<button on:click={() => studentActivityDownloadExcel(userAct)}>
				<svg
					class="h-6 w-6 text-gray-500 dark:text-white"
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
						stroke-width="2"
						d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
					/>
				</svg>
			</button>

			<button>
				<svg
					class="h-6 w-6 text-gray-500 dark:text-white"
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
						stroke-width="2"
						d="M5 12h14m-7 7V5"
					/>
				</svg>
			</button>
		</div>
	</div>

	<div class="space-y-4 overflow-x-auto">
		<table class="table table-hover table-compact table-auto border-collapse">
			<thead class="font-medium">
				<tr class="border-b px-4 py-2">
					<td>
						<label class="flex items-center space-x-2">
							<input class="checkbox select-all" type="checkbox" on:change={toggleSelectAll} />
						</label>
					</td>
					<ThSort {handler} orderBy="username">Name</ThSort>
					<ThSort {handler} orderBy="actionTypeName">Activities</ThSort>
					<ThSort {handler} orderBy="doneAt">Date and Time</ThSort>
					<td class="font-bold">Proof</td>
					<td class="font-bold">Validation</td>
					<td class="font-bold">Action</td>
				</tr>
			</thead>
			<tbody>
				{#each $rows as row}
					<tr>
						<td class="border-b px-4 py-2">
							<input
								class="checkbox"
								type="checkbox"
								value={row.id}
								on:change={() => toggleCheckbox(row.id)}
							/>
						</td>
						<td class="border-b px-4 py-2">{row.username}</td>
						<td class="border-b px-4 py-2">{row.actionTypeName}</td>
						<td class="border-b px-4 py-2">{row.doneAt}</td>
						<td class="border-b px-4 py-2">
							{#if row.proof}
								<!-- svelte-ignore a11y-missing-attribute -->
								<button
									class="anchor"
									on:click={() => {
										onShowImageProof(row.proof);
									}}
								>
									Proof
								</button>
							{:else}
								-
							{/if}
						</td>
						<td class="border-b px-4 py-2">
							{#if row.valid}
								<span class="rounded-full bg-green-500 px-3 py-1 font-bold text-white">Valid</span>
							{:else}
								<span class="rounded-full bg-red-500 px-3 py-1 font-bold text-white">Invalid</span>
							{/if}
						</td>
						<td class="border-b px-4 py-2">
							<button use:popup={popupFeatured}>
								<svg
									class="h-6 w-6 text-gray-800 dark:text-white"
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
										stroke-width="2"
										d="M12 6h.01M12 12h.01M12 18h.01"
									/>
								</svg>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<footer class="flex justify-between pt-3">
		<div class="font-regular text-gray-500">
			<h3>
				Showing {#if $rowCount.total > 0}
					{$rowCount.start} to {$rowCount.end} of
					{$rowCount.total} entries
				{:else}
					No entries found
				{/if}
			</h3>
		</div>
		<div class="flex">
			<RowsPerPage {handler} />
			<Pagination {handler} />
		</div>
	</footer>
</div>
