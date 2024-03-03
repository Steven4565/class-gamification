<script lang="ts">
	import type { ActivityProp } from '$lib/types/activity';
	import { createEventDispatcher } from 'svelte';

	export let action: ActivityProp;
	$: ({ name, quota, experience, maxQuota } = action);

	const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col items-center justify-center">
	<button
		type="button"
		class="variant-filled btn flex h-[100px] w-[100px] flex-col bg-gray-400"
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
	</button>
	<p class="text-center">
		{name}
	</p>
</div>
