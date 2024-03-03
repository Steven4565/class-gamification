<script lang="ts">
	import type { Prisma, UserActivities } from '@prisma/client';
	import { Card, Button } from 'flowbite-svelte';

	interface UserData {
		id: string;
		username: string;
	}

	type ActivitiesTypeWithoutUser = Prisma.UserActivitiesGetPayload<{
		include: { actionType: true };
	}> & { user: UserData };

	export let activities: ActivitiesTypeWithoutUser[] | undefined;
</script>

<div class="w-full">
	{#each activities || [] as asg}
		<Card class="min-w-ull">
			<div class="custom-grid">
				<p class="text-md font-semibold text-gray-900 dark:text-white">
					{asg.user.id} has done his/her {asg.actionType.resetTime} Quest. ({asg.actionType
						.description})
				</p>
				<p class="text-md font-semibold text-gray-900 dark:text-white">
					+{asg.actionType.experience}
				</p>
				<input type="hidden" name="asgId" />
				<Button
					color="red"
					on:click={() => {
						// TODO: add model
					}}>Delete</Button
				>
			</div>
		</Card>
	{/each}
</div>
