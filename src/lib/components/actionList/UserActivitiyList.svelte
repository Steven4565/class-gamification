<script lang="ts">
	import type { UserActivities, ActivityType } from '@prisma/client';
	import { P, Heading } from 'flowbite-svelte';

	interface ActionList extends UserActivities {
		actionType: ActivityType;
	}

	export let actionList: ActionList[];

	function formatDate(date: Date) {
		// console.log('prob', date);
		console.log(typeof date);
		// if (!date.getDate) {
		// 	console.log('no date');
		// 	console.log(actionList);
		// }
		const day = date.getDate();
		// let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
		// let year = date.getFullYear();
		// let hours = date.getHours().toString().padStart(2, '0');
		// let minutes = date.getMinutes().toString().padStart(2, '0');
		// let seconds = date.getSeconds().toString().padStart(2, '0');

		// return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
		return 'test';
	}
</script>

<div>
	{#each actionList as action}
		<div class="my-3 flex bg-gray-200 p-3">
			<div class="w-24">
				<Heading tag="h2" class=" text-green-300">+{action.actionType.experience}</Heading>
			</div>
			<div>
				<P size="lg"><b> {action.actionType.name.toUpperCase()} </b></P>
				<P>{formatDate(action.doneAt)}</P>
				<!-- <P>{action.doneAt.toString()}</P> -->
			</div>
		</div>
	{/each}
</div>
