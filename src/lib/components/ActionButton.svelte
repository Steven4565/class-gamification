<script lang="ts">
	import type { ActivityProp } from '$lib/types/activity';
	import { Button, P } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	export let action: ActivityProp;
	$: ({ name, quota, experience, maxQuota } = action);

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center justify-center">
	<Button
		class="flex h-[100px] w-[100px] flex-col bg-gray-400"
		disabled={quota >= maxQuota}
		on:click={() => {
			dispatch('actionClicked', { action });
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
