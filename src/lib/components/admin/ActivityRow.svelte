<!-- <script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { Card } from 'flowbite-svelte';

	export let actionId: number;

	const modalStore = getModalStore();
</script>

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
		<button
			class="variant-filled-error btn"
			on:click={() => {
				modalStore.trigger(modal);
			}}>Delete</button
		>
	</div>
</Card> -->
