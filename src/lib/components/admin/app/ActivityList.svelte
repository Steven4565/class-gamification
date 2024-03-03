<script lang="ts">
	import type { Prisma } from '@prisma/client';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	interface UserData {
		id: string;
		username: string;
	}

	type ActivitiesTypeWithoutUser = Prisma.UserActivitiesGetPayload<{
		include: { actionType: true };
	}> & { user: UserData };

	export let activities: ActivitiesTypeWithoutUser[] | undefined;

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		title: 'Delete Action',
		component: 'deleteActionModal'
	};
</script>

<div class="w-full">
	{#each activities || [] as asg}
		<div class="min-w-ull card">
			<div class="custom-grid">
				<p class="text-md font-semibold text-gray-900 dark:text-white">
					{asg.user.id} has done his/her {asg.actionType.resetTime} Quest. ({asg.actionType
						.description})
				</p>
				<p class="text-md font-semibold text-gray-900 dark:text-white">
					+{asg.actionType.experience}
				</p>
				<button
					class="variant-filled-error btn"
					on:click={() => {
						modal.meta = { actionId: asg.id };
						modalStore.trigger(modal);
					}}>Delete</button
				>
			</div>
		</div>
	{/each}
</div>
