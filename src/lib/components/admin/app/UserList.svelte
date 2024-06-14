<script lang="ts">
	import { Avatar, getModalStore, type ModalSettings, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import UserButton from '$lib/components/admin/UserButton.svelte';
	import { Prisma } from '@prisma/client';

	type UserData = Prisma.UserClassGetPayload<{
		include: { 
			user:  {
				select: {
					id: true,
					username: true
				}
			}
		};
	}>

	export let users: UserData[] | undefined;
	export let name: String | undefined;
	export let description: String | undefined;

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		title: 'Add Users',
		component: 'addUsersModal'
	};

</script>

<div class="px-3">
	<div class="flex flex-col w-11/12 mx-auto gap-y-5">
		<div class="flex justify-between items-center w-full">
			<div class="flex items-center gap-3">
				<Avatar
					src="https://placehold.co/200"
					width="w-28"
				/>
				<div>
					<p class="font-poppins font-bold text-xl">{name}</p>
					<p class="font-poppins">{description}</p>
					<p class="font-poppins text-sunriseOrange text-sm">{users?.length} members</p>
				</div>
			</div>
			<button
				class="font-poppins font-bold text-xs text-white bg-electricCyan h-fit py-3.5 px-6 rounded-lg"
				on:click={() => {
					modalStore.trigger(modal);
				}}
			>
				Add Student
			</button>
		</div>
	
		<div class="grid button-user-grid gap-3 w-full place-items-center">
			{#each users || [] as user, i}
				<UserButton user={user} index={i}/>
			{/each}
		</div>
	</div>
</div>

