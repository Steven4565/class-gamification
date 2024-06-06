<script lang="ts">
	import {
		Avatar,
		getModalStore,
		type ModalSettings,
		type PopupSettings,
		popup
	} from '@skeletonlabs/skeleton';
	import { DotsVerticalSolid } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
	import { Prisma } from '@prisma/client';

	type UserData = Prisma.UserClassGetPayload<{
		include: {
			user: {
				select: {
					id: true;
					username: true;
				};
			};
		};
	}>;

	export let user: UserData;
	export let index: Number;

	const modalStore = getModalStore();

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClassButtonOption-' + index,
		placement: 'bottom'
	};

	function onDelete(event: Event) {
		event.stopPropagation();
		const deleteModal: ModalSettings = {
			type: 'component',
			title: 'Remove User',
			component: 'removeUserModal',
			meta: {
				selectedData: user
			}
		};
		modalStore.trigger(deleteModal);
	}

	const cButton = 'font-inter font-medium text-sm bg-white px-5 py-1.5 w-full shadow-md';
</script>

<a
	href={`/admin/user/${user.userId}`}
	class="relative flex h-56 w-44 flex-col items-center justify-center gap-1 overflow-hidden rounded-lg bg-[#F8F8F8] bg-opacity-70 p-5 text-center shadow-lg drop-shadow-lg"
>
	<Avatar class="" width="w-24" src="https://placehold.co/200" alt="" />
	<p class="w-full truncate font-poppins font-bold">{user.user.username.toUpperCase()}</p>
	<p class="w-full truncate font-poppins text-xs font-semibold text-brightAzure">
		{user.userId.toUpperCase()}
	</p>
	<div class="absolute right-0 top-2">
		<button
			use:popup={popupClick}
			on:click={(event) => {
				event.stopPropagation();
			}}
		>
			<DotsVerticalSolid size="xl" class="opacity-80 focus:outline-none" color="black" />
		</button>

		<div data-popup={'popupClassButtonOption-' + index}>
			<div class="flex flex-col items-center rounded-lg">
				<button on:click={onDelete} class="{cButton} rounded-lg text-crimson">Delete</button>
			</div>
		</div>
	</div>
</a>
