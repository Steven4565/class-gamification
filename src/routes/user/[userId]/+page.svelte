<script lang="ts">
	export let data;
	$: ({ user, actions } = data);
	import UserActivitiyList from '$lib/components/actionList/UserActivitiyList.svelte';
	import { Heading } from 'flowbite-svelte';
</script>

<section class="mx-auto w-[900px]">
	<div class=" flex items-center">
		<div class="m-7 h-max">
			<img class="rounded-full" src="https://placekitten.com/200/200" alt="" />
		</div>
		<div>
			<Heading class="mb-3">{user.username}</Heading>
			<Heading tag="h3">{user.exp} Points</Heading>
			<div>
				<!-- TODO: input tags here -->
			</div>
		</div>
	</div>

	<div class="mt-5">
		<Heading tag="h2">Recent Activities</Heading>
		<UserActivitiyList actionList={actions} />
	</div>
</section>
