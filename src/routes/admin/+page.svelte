<script lang="ts">
	import { CirclePlusOutline } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import ClassButton from '$lib/components/admin/ClassButton.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const modalStore = getModalStore();

	const createModal: ModalSettings = {
		type: 'component',
		title: 'Create class',
		component: 'classFieldModal',
		meta: {
			type: 'create'
		}
	};
</script>

<div class="flex w-full flex-wrap justify-evenly gap-6">
	{#each data.res || [] as classData, i}
		<ClassButton {classData} index={i} />
	{/each}

	<button
		class="card flex min-h-60 min-w-60 max-w-60 cursor-pointer items-center justify-center bg-gray-200 hover:bg-gray-300"
		on:click={() => {
			modalStore.trigger(createModal);
		}}
	>
		<CirclePlusOutline class="size-16 opacity-70" />
	</button>
</div>
