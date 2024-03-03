<script lang="ts">
	import type { User } from '@prisma/client';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { PlusSolid } from 'flowbite-svelte-icons';

	interface UserData {
		id: string;
		username: string;
	}

	export let users: UserData[] | undefined;

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		title: 'Add Users',
		component: 'addUsersModal'
	};
</script>

<div class="mx-auto flex flex-wrap gap-3">
	{#each users || [] as user}
		<a class="card flex min-h-48 max-w-48 justify-center hover:bg-gray-200" href="./">
			<div class="flex flex-col items-center">
				<img class="mb-3" src="/images/profile-picture-3.webp" alt="user profile" />
				<h5 class="text-xl font-medium text-gray-900 dark:text-white">{user.id}</h5>
			</div>
		</a>
	{/each}

	<button
		class=" card flex min-h-48 max-w-48 cursor-pointer items-center justify-center bg-gray-200 hover:bg-gray-300"
		on:click={() => {
			modalStore.trigger(modal);
		}}
	>
		<PlusSolid class="size-1/3" />
	</button>
</div>
