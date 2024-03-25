<script lang="ts">
	import { Avatar, getModalStore, type ModalSettings, type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import { DotsVerticalSolid } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
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
    

    export let user: UserData;
    export let index: Number;

    const modalStore = getModalStore();

    const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClassButtonOption-' + index,
		placement: 'bottom'
	};

    const deleteModal: ModalSettings = {
		type: 'component',
		title: 'Remove User',
		component: 'removeUserModal',
        meta: {
            selectedData: user,
        }
	};

	function onDelete(event: Event) {
		event.stopPropagation();
		modalStore.trigger(deleteModal);
	}

	const cButton = 'font-inter font-medium text-sm bg-white px-5 py-1.5 w-full shadow-md';
</script>


<button
    on:click={() => goto(`#`)}
    class="relative flex flex-col w-44 p-5 h-56 overflow-hidden justify-center items-center text-center bg-[#F8F8F8] bg-opacity-70 rounded-lg shadow-lg drop-shadow-lg gap-1"
>
    <Avatar class="" width="w-24" src="https://placehold.co/200" alt="" />
    <p class="font-poppins font-bold truncate w-full">{user.user.username.toUpperCase()}</p>
    <p class="font-poppins font-semibold text-brightAzure text-xs truncate w-full">{user.userId.toUpperCase()}</p>
    <div class="absolute right-0 top-2">
        <button
            use:popup={popupClick}
            on:click={(event) => {
                event.stopPropagation();
            }}
        >
            <DotsVerticalSolid size="xl" class="focus:outline-none opacity-80" color="black"/>
        </button>

        <div data-popup={'popupClassButtonOption-' + index}>
            <div class="flex flex-col items-center rounded-lg">
                <button on:click={onDelete} class="{cButton} rounded-lg text-crimson">Delete</button>
            </div>
        </div>
    </div>
</button>