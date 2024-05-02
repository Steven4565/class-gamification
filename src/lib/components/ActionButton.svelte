<script lang="ts">
	import type { ActivityProp } from '$lib/types/activity';
	import { createEventDispatcher } from 'svelte';
	import plusIcon from '$lib/assets/icons/plus.svg';

	export let action: ActivityProp;
	$: ({ name, quota, experience, maxQuota } = action);

	const dispatch = createEventDispatcher();
</script>

<button
	type="button"
	class="variant-filled btn flex w-[175px] flex-col overflow-hidden rounded-xl bg-white p-0 shadow-md shadow-[#979797]"
	disabled={quota >= maxQuota}
	on:click={() => {
		dispatch('actionClicked', { action });
	}}
>
	<div class="w-full bg-primary-400 p-3">
		<p class="text-center font-bold text-white">
			{name}
		</p>
	</div>
	<div class="flex w-full justify-between p-2">
		<div class="w-1/2 justify-between text-left">
			<p class="p text-md font-bold text-black">
				{experience} XP
			</p>
			<p class="p -mt-1 text-sm text-black">
				{quota}/{maxQuota}
			</p>
		</div>
		<div class="grid h-5 w-5 place-items-center self-end rounded-full bg-secondary-500">
			<img src={plusIcon} alt="Plus Icon" class="p-1" />
		</div>
	</div>
</button>
