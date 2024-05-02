<script lang="ts">
	import ActivityList from '$lib/components/admin/app/ActivityList.svelte';
	import UserList from '$lib/components/admin/app/UserList.svelte';
	import { ActivitySelected } from '$lib/stores/admin/activitySelected';

	export let data
	$: ({ userClass } = data);
</script>

<div class="w-full">
	{#if $ActivitySelected}
		<ActivityList activities={userClass?.UserActivities} name={userClass?.name} description={userClass?.description} userCount={userClass?.userClass.map((user) => user.user).length} />
	{:else}
		<UserList users={userClass?.userClass} name={userClass?.name} description={userClass?.description}/>
	{/if}
</div>
