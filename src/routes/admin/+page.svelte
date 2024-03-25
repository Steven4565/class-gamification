<script lang="ts">
	import { GridPlusSolid } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import ClassButton from '$lib/components/admin/ClassButton.svelte';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let classList = data.res;
	let search = '';
	$: {
		if (data.res) {
			classList = data.res.filter((classData) => classData.name.toLowerCase().includes(search.toLowerCase()));
		}
	}

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

<div class="flex flex-col items-center w-11/12 m-auto gap-8 justify-center">
	<div class="flex w-full items-center gap-x-2">
		<input bind:value={search} placeholder="Search here..." class="w-full font-poppins font-medium p-2 rounded-lg bg-silver drop-shadow-lg shadow-inner focus:outline-none bg-opacity-45"/>
		<GridPlusSolid 
			color="silver"
			class="focus:outline-none cursor-pointer size-9"
			on:click={() => {
				modalStore.trigger(createModal);
			}}
		/>
	</div>
	<div class="grid button-grid gap-5 w-full">
		{#each classList || [] as classData, i}
			<ClassButton {classData} index={i}/>
		{/each}	
	</div>
</div>
