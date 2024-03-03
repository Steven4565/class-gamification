<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Avatar, Button, Modal, Label, Textarea, Toast } from 'flowbite-svelte';
	import { PlusSolid, CircleCheckSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { writable } from 'svelte/store';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ActivityList from '$lib/components/admin/app/ActivityList.svelte';
	import UserList from '$lib/components/admin/app/UserList.svelte';
	import { Prisma } from '@prisma/client';

	const modalStore = getModalStore();

	export let data;
	$: ({ userClass } = data);

	// const formControl: SubmitFunction = () => {
	//     return async(option) => {
	//         await option.update();
	//         $formModal = false;
	//         $popupModal = false;
	//         $showToast = true;
	//         setTimeout(() => $showToast = false, 2000)
	//     }
	// }

	// const selectedId = writable<Number>(undefined);
	// const popupModal = writable(false);

	// function DeleteAction(id: number) {
	// 	$selectedId = id;
	// 	$popupModal = true;
	// }

	const activitySelected = writable(false);
</script>

<div class="w-full p-5">
	<div class="flex items-center gap-10 pb-4">
		<div>
			<p class="text-3xl font-medium text-gray-900 dark:text-white">{userClass?.name}</p>
			<p class="text-xl font-bold text-gray-900 dark:text-white">{userClass?.description}</p>
		</div>
		<Button
			color="dark"
			class="h-fit py-3"
			on:click={() => ($activitySelected = $activitySelected ? false : true)}
		>
			{#if $activitySelected}
				Members
			{:else}
				Activities
			{/if}
		</Button>
	</div>

	{#if $activitySelected}
		<ActivityList activities={userClass?.UserActivities} />
	{:else}
		<UserList users={userClass?.userClass.map((user) => user.user)} />
	{/if}
</div>

<!-- <Modal bind:open={$formModal} size="xs" autoclose={false} class="w-full">
	<form
		class="flex flex-col space-y-3"
		method="POST"
		action="?/addStudent"
		use:enhance={formControl}
	>
		<h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Add Student</h3>
		<Label class="space-y-2">
			<span>NIM</span>
			<Textarea type="text" name="studentId" rows="3" class="flex h-fit text-wrap" />
		</Label>
		<Button type="submit" class="w-full1">Add</Button>
	</form>
</Modal>

<Modal bind:open={$popupModal} size="xs" outsideclose autoclose={false}>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			Are you sure you want to delete this actvity?
		</h3>
		<form method="POST" action="?/removeAsg" use:enhance={formControl}>
			<input type="hidden" name="asgId" value={$selectedId} />
			<Button type="submit" color="red" class="me-2">Yes, I'm sure</Button>
		</form>
	</div>
</Modal> -->

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto auto;
		column-gap: 1rem;
		align-items: center;
	}
</style>
