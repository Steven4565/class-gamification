<script lang="ts">
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import ClassButton from '$lib/components/admin/ClassButton.svelte';

	export let data: PageData;

	type Class = {
		id: number;
		name: string;
		description: string;
		userCount: number;
	};

	let selectedData: Class | undefined;

	// function openModal(action?: string, id?: number) {
	// 	if (id) {
	// 		$selectedData = data?.res?.find((item) => item.id === id);
	// 	}

	// 	if (action === 'delete' && id) {
	// 		$popupModal = true;
	// 		$toastData = {
	// 			color: 'red',
	// 			description: 'Class has been deleted'
	// 		};
	// 	} else if (action === 'update') {
	// 		$formModal = true;
	// 		$toastData = {
	// 			color: 'orange',
	// 			description: 'Class has been updated'
	// 		};
	// 	} else if (action === 'create') {
	// 		$formModal = true;
	// 		$toastData = {
	// 			color: 'green',
	// 			description: 'Class has been created'
	// 		};
	// 	}
	// }
</script>

<div class="flex w-full flex-wrap justify-evenly gap-6">
	{#each data.res || [] as classData}
		<ClassButton {classData} />
	{/each}

	<button
		class="card flex min-h-60 max-w-60 cursor-pointer items-center justify-center bg-gray-200 hover:bg-gray-300"
		on:click={() => {
			// TODO: open modal
		}}
	>
		<CirclePlusOutline class="size-16 opacity-70" />
	</button>
</div>
