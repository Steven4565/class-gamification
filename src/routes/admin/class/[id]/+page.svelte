<script lang="ts">
	import ActivityList from '$lib/components/admin/app/ActivityList.svelte';
	import UserList from '$lib/components/admin/app/UserList.svelte';

	export let data;
	$: ({ userClass } = data);

	let activitySelected: boolean = false;
</script>

<div class="w-full p-5">
	<div class="flex items-center gap-10 pb-4">
		<div>
			<p class="text-3xl font-medium text-gray-900 dark:text-white">{userClass?.name}</p>
			<p class="text-xl font-bold text-gray-900 dark:text-white">{userClass?.description}</p>
		</div>
		<button
			class="variant-filled btn h-fit py-3"
			on:click={() => (activitySelected = activitySelected ? false : true)}
		>
			{#if activitySelected}
				Members
			{:else}
				Activities
			{/if}
		</button>
	</div>

	{#if activitySelected}
		<ActivityList activities={userClass?.UserActivities} />
	{:else}
		<UserList users={userClass?.userClass.map((user) => user.user)} />
	{/if}
</div>
