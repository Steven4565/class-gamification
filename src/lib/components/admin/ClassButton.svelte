<script lang="ts">
	import { goto } from '$app/navigation';
	import { classActions, type ClassData } from '$lib/types/classData';
	import {
		getModalStore,
		popup,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import { DotsVerticalSolid } from 'flowbite-svelte-icons';

	export let classData: ClassData;
	export let index: number;

	const modalStore = getModalStore();

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
</script>

<button
	class="card relative flex min-h-60 min-w-60 max-w-60 cursor-pointer justify-center hover:bg-gray-200"
	on:click={() => goto(`/admin/class/${classData.id}`)}
>
	<div class="absolute right-7 top-7">
		<button
			use:popup={popupClick}
			on:click={(event) => {
				event.stopPropagation();
			}}
		>
			<DotsVerticalSolid size="lg" />
		</button>

		<div data-popup={'popupClassButtonOption-' + index}>
			<div>
				<button on:click={onEdit}> Edit </button>
				<button on:click={onDelete} class="text-red-500"> Delete </button>
			</div>

			<!-- <Dropdown class="w-fit">
			<DropdownItem
				on:click={(event) => {
					modalStore.trigger(updateModal);

					event.stopPropagation();
				}}>Edit</DropdownItem
			>
			<DropdownItem
				class="text-red-500"
				on:click={(event) => {
					modalStore.trigger(deleteModal);

					event.stopPropagation();
				}}>Delete</DropdownItem
			>
		</Dropdown> -->
		</div>
	</div>
	<div class="flex flex-col items-center text-center">
		<h5 class="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{classData.name}</h5>
		<span class="text-md text-gray-500 dark:text-gray-400">{classData.description}</span>
		<span class="text-md text-gray-500 dark:text-gray-400">{classData.userCount} members</span>
	</div>
</button>
