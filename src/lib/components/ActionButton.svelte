<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActivityProp } from '$lib/types/activity';
	import { Button, P } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let activity: ActivityProp;
	let { id, name, quota, experience } = activity;
	const maxQuota = 3; // TODO: add max quota to activity

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center justify-center">
	<Button
		type="submit"
		class="flex h-[100px] w-[100px] flex-col bg-gray-400"
		disabled={quota >= maxQuota}
		on:click={() => {
			dispatch('actionClicked', { activity });
		}}
	>
		<span>
			{quota}/{maxQuota}
		</span>
		<span class="text-green-300">
			{experience} XP
		</span>
	</Button>
	<P class="text-center">
		{name}
	</P>
</div>
