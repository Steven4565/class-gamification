<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		Dropdown,
		DropdownItem,
		Button,
		Modal,
		Label,
		Input,
		Toast,
		Accordion
	} from 'flowbite-svelte';
	import {
		DotsVerticalSolid,
		CirclePlusOutline,
		ExclamationCircleOutline,
		CircleCheckSolid
	} from 'flowbite-svelte-icons';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data: PageData;

	type Class = {
		id: number;
		name: string;
		description: string;
		userCount: number;
	};

	type Toast = {
		color: 'red' | 'green' | 'orange';
		description: string;
	};

	const formModal = writable(false);
	const popupModal = writable(false);
	const selectedData = writable<Class | undefined>(undefined);
	const showToast = writable(false);
	const toastData = writable<Toast | undefined>(undefined);

	function openModal(action?: string, id?: number) {
		if (id) {
			$selectedData = data?.res?.find((item) => item.id === id);
		}

		if (action === 'delete' && id) {
			$popupModal = true;
			$toastData = {
				color: 'red',
				description: 'Class has been deleted'
			};
		} else if (action === 'update') {
			$formModal = true;
			$toastData = {
				color: 'orange',
				description: 'Class has been updated'
			};
		} else if (action === 'create') {
			$formModal = true;
			$toastData = {
				color: 'green',
				description: 'Class has been created'
			};
		}
	}

	function clearModal() {
		$formModal = false;
		$popupModal = false;
		$selectedData = undefined;
	}

	function goToDetail(id: number) {
		goto(`/admin/class/${id}`);
	}

	const formControl: SubmitFunction = () => {
		return async (option) => {
			await option.update();
			clearModal();
			$showToast = true;
			setTimeout(() => {
				$showToast = false;
				$toastData = undefined;
			}, 2000);
		};
	};
</script>

<div class="flex w-full flex-wrap justify-evenly gap-6">
	{#each data.res || [] as classData}
		<button
			class="card relative flex min-h-60 min-w-60 max-w-60 cursor-pointer justify-center hover:bg-gray-200"
			on:click={() => goToDetail(classData.id)}
		>
			<div class="absolute right-7 top-7">
				<DotsVerticalSolid size="lg" on:click={(event) => event.stopPropagation()} />
				<Dropdown class="w-fit">
					<DropdownItem
						on:click={(event) => {
							openModal('update', classData.id);
							event.stopPropagation();
						}}>Edit</DropdownItem
					>
					<DropdownItem
						class="text-red-500"
						on:click={(event) => {
							openModal('delete', classData.id);
							event.stopPropagation();
						}}>Delete</DropdownItem
					>
				</Dropdown>
			</div>
			<div class="flex flex-col items-center text-center">
				<h5 class="mb-1 text-2xl font-medium text-gray-900 dark:text-white">{classData.name}</h5>
				<span class="text-md text-gray-500 dark:text-gray-400">{classData.description}</span>
				<span class="text-md text-gray-500 dark:text-gray-400">{classData.userCount} members</span>
			</div>
		</button>
	{/each}

	<button
		class="card flex min-h-60 max-w-60 cursor-pointer items-center justify-center bg-gray-200 hover:bg-gray-300"
		on:click={() => openModal('create')}
	>
		<CirclePlusOutline class="size-16 opacity-70" />
	</button>

	<Modal bind:open={$formModal} size="xs" outsideclose autoclose={false} on:close={clearModal}>
		<form
			class="flex flex-col space-y-6"
			method="POST"
			action={$selectedData == undefined ? '?/addClass' : '?/updateClass'}
			use:enhance={formControl}
		>
			<Input type="hidden" name="id" value={$selectedData?.id} />
			<h3 class="mb-2 text-2xl font-medium text-gray-900 dark:text-white">
				{#if $selectedData == undefined}Create{:else}Edit{/if} class
			</h3>
			<div class="custom-grid">
				<span class="text-lg">Name</span>
				<span>:</span>
				<Label class="justify-left flex items-center">
					<Input
						type="text"
						name="name"
						required
						class="border-1 ml-2"
						color="base"
						value={$selectedData?.name}
					/>
				</Label>
				<span class="text-lg">Description</span>
				<span>:</span>
				<Label class="justify-left flex items-center">
					<Input
						type="text"
						name="description"
						class="border-1 ml-2"
						color="base"
						value={$selectedData?.description}
					/>
				</Label>
			</div>
			<Button
				type="submit"
				class="mx-auto w-fit rounded-md border-2 border-solid border-green-400 bg-lime-300 bg-opacity-15"
				color="none">Done</Button
			>
		</form>
	</Modal>

	<Modal bind:open={$popupModal} size="xs" outsideclose autoclose={false} on:close={clearModal}>
		<div class="text-center">
			<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this class?
			</h3>
			<form method="POST" action="?/removeClass" use:enhance={formControl}>
				<input type="hidden" name="id" value={$selectedData?.id} />
				<Button type="submit" color="red" class="me-2">Yes, I'm sure</Button>
				<Button on:click={clearModal} color="alternative">No, cancel</Button>
			</form>
		</div>
	</Modal>
</div>

<Toast
	bind:open={$showToast}
	transition={fade}
	class="fixed bottom-0 left-0 z-50 mb-4 ml-4"
	color={$toastData?.color}
>
	<CircleCheckSolid slot="icon" class="h-5 w-5" />
	{$toastData?.description}
</Toast>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: auto auto minmax(0, 1fr);
		row-gap: 1rem;
		column-gap: 0.5rem;
		align-items: center;
	}
</style>
