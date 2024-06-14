<script lang="ts">
	import ActivityList from '$lib/components/admin/app/ActivityList.svelte';
	import UserList from '$lib/components/admin/app/UserList.svelte';
	import { page } from '$app/stores';

	export let data
	$: ({ userClass } = data);

	$: queryParams = new URLSearchParams($page.url.search);
	$: activitySelected = queryParams.get('activity') === 'false';
</script>

<div class="w-full">
	{#if !activitySelected}
		<ActivityList activities={userClass?.UserActivities} name={userClass?.name} description={userClass?.description} userCount={userClass?.userClass.map((user) => user.user).length} />
	{:else}
		<UserList users={userClass?.userClass} name={userClass?.name} description={userClass?.description}/>
	{/if}
</div>
