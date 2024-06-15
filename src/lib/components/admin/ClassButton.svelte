<script lang="ts">
	import { goto } from '$app/navigation';
	import { classActions, type ClassData } from '$lib/types/classData';
	import {
		getModalStore,
		popup,
		type ModalSettings,
		type PopupSettings,
		Avatar
	} from '@skeletonlabs/skeleton';
	import { DotsVerticalSolid, UsersGroupSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';

	export let classData: ClassData;
	export let index: number;

	const modalStore = getModalStore();
	$: queryParams = new URLSearchParams($page.url.search);

	const updateModal: ModalSettings = {
		type: 'component',
		title: 'Edit class',
		component: 'classFieldModal',
		meta: {
			type: classActions.edit,
			selectedData: classData
		}
	};
	const deleteModal: ModalSettings = {
		type: 'component',
		title: 'Delete class',
		component: 'removeClassModal',
		meta: {
			type: classActions.delete,
			selectedData: classData
		}
	};

	function onEdit(event: Event) {
		event.stopPropagation();
		modalStore.trigger(updateModal);
	}

	function onDelete(event: Event) {
		event.stopPropagation();
		modalStore.trigger(deleteModal);
	}

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClassButtonOption-' + index,
		placement: 'bottom'
	};

	const cButton = 'font-inter font-medium text-sm bg-white px-5 py-1.5 w-full shadow-md';
	const cButtonHeaderFont = 'font-poppins text-white truncate w-full';
</script>


<button
	class="relative rounded-xl overflow-hidden shadow-md h-44 w-64 flex flex-col justify-start items-start m-auto hover:bg-slate-200"
	on:click={() => {
		goto(`/admin/class/${classData.id}`)
	}}
>
	<div class="bg-brightAzure flex w-full p-3 pb-1.5">
		<div class="w-7/12 flex flex-col items-start text-left">
			<p class="{cButtonHeaderFont} font-extrabold text-xl">{classData.name}</p>
			<p class="{cButtonHeaderFont} font-light text-sm">{classData.description}</p>
		</div>
	</div>
	<div class="p-3 ">
		<p class="font-poppins font-light text-sm">{classData.userCount} members</p>
	</div>

	<Avatar
		class="absolute right-8 top-8"
		src="https://placehold.co/200"
	/>

	<div class="absolute right-0 top-2">
		<button
			use:popup={popupClick}
			on:click={(event) => {
				event.stopPropagation();
			}}
		>
			<DotsVerticalSolid size="xl" class="focus:outline-none" color="#FFFFFF"/>
		</button>

		<div data-popup={'popupClassButtonOption-' + index}>
			<div class="flex flex-col items-center rounded-lg">
				<button on:click={onEdit} class="{cButton} rounded-t-lg">Edit</button>
				<div class="h-px w-full bg-brightAzure"/>
				<button on:click={onDelete} class="{cButton} rounded-b-lg text-crimson">Delete</button>
			</div>
		</div>
	</div>

	<UsersGroupSolid 
		size="xl" 
		color="#000000" 
		class="absolute bottom-3 right-3 opacity-25"
		on:click={(event) => {
			event.stopPropagation();
			queryParams.set('activity', 'false');
			goto(`/admin/class/${classData.id}?${queryParams.toString()}`);
		}}
	/>
</button>