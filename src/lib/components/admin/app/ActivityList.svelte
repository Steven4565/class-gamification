<script lang="ts">
	import type { Prisma } from '@prisma/client';
	import { Avatar, getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { EditOutline } from 'flowbite-svelte-icons';
	import { classActions, type ClassData } from '$lib/types/classData';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const classId = $page.params.id;
	const modalStore = getModalStore();

	interface UserData {
		id: string;
		username: string;
	}

	type ActivitiesTypeWithoutUser = Prisma.UserActivitiesGetPayload<{
		include: { actionType: true };
	}> & { user: UserData };

	export let activities: ActivitiesTypeWithoutUser[] | undefined;
	export let name: string = '';
	export let description: string = '';
	export let userCount: number | undefined;

	const cActivities = ""

	const classData: ClassData = {
		id: Number.parseInt(classId),
		name: name,
		description: description,
		userCount: userCount || 0
	};

	const updateModal: ModalSettings = {
		type: 'component',
		title: 'Edit class',
		component: 'classFieldModal',
		meta: {
			type: classActions.edit,
			selectedData: classData
		}
	};

	function onEdit(event: Event) {
		event.stopPropagation();
		modalStore.trigger(updateModal);
	}

	$: queryParams = new URLSearchParams($page.url.search);

	function gotoUser(){
		queryParams.set('activity', 'false');
		goto(`${$page.url.pathname}?${queryParams.toString()}`);

	}
</script>

<div class="px-3">
	<div class="w-11/12 mx-auto">
		<div class="flex justify-between items-center mb-12">
			<div class="flex gap-x-10">
				<div class="flex flex-col items-center">
					<Avatar 
						src="https://placehold.co/200"
						width="w-36"
					/>
					<button class="font-poppins font-medium text-sm text-[#747373]" 
						on:click={() => gotoUser()}
					>View Members</button>
				</div>
				<div class="flex flex-col justify-center">
					<div class="flex">
						<p class="font-poppins font-bold text-xl mr-2">{name}</p>
						<EditOutline class="opacity-60" size="lg" on:click={onEdit}/>
					</div>
					<p class="font-poppins font-medium text-sm">{description}</p>
					<p class="font-poppins font-medium text-sm text-[#786969]">{userCount} members</p>
				</div>
			</div>
			<a class="font-poppins text-white font-semibold text-sm bg-brightAzure px-8 py-2 rounded-lg" href="{classId}/verification">Verification</a>
		</div>
	
		<div>
			<p class="font-semibold font-poppins text-xl">Recent Activities</p>
		</div>
		{#if activities?.length === 0}
			<p>No activity happened today</p>
		{:else}
			<div class="flex flex-col gap-1.5">
				{#each activities || [] as asg}
					<div class="min-w-ull card bg-lavenderMist px-5 py-2.5">
						<div class="flex justify-between">
							<p class="font-poppins">
								<span class="text-[#A8ACB0] mr-2">{asg.doneAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
								<span class="font-bold">{asg.user.username}</span>
								has submitted {asg.actionType.resetTime} assignment
							</p>
							<p class="font-poppins font-bold text-brightAzure">
								+ {asg.actionType.experience} pts
							</p>
						</div>
					</div>
				{/each}
			</div>
			
		{/if}
	</div>	
</div>
