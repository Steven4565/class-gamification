<script lang="ts">
	import type { UserActivities, ActivityType } from '@prisma/client';

	interface ActionList extends UserActivities {
		actionType: ActivityType;
	}

	export let actionList: ActionList[];

	function formatDate(date: Date) {
		const day = date.getDate();
		let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
		let year = date.getFullYear();
		let hours = date.getHours().toString().padStart(2, '0');
		let minutes = date.getMinutes().toString().padStart(2, '0');
		let seconds = date.getSeconds().toString().padStart(2, '0');

		return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
	}
</script>

<div>
	{#each actionList as action}
		<div class="my-3 flex rounded-xl p-3 outline outline-1 outline-surface-700">
			<div class="w-24">
				<h2 class="h2 text-green-500"><b>+{action.actionType.experience}</b></h2>
			</div>
			<div>
				<p><b>{action.actionType.name.toUpperCase()} </b></p>
				<p>{formatDate(action.doneAt)}</p>
			</div>
		</div>
	{/each}
</div>
