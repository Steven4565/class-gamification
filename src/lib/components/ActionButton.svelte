<script lang="ts">
	import { Button, P } from 'flowbite-svelte';

	export let name = '';
	export let maxQuota = 1;
	export let currentQuota = 0;
</script>

<div class="flex flex-col items-center justify-center">
	<Button class="h-[100px] w-[100px] bg-gray-400">
		{currentQuota}/{maxQuota}
	</Button>
	<P class="text-center">
		{name}
	</P>
</div>
