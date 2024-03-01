<script lang="ts">
	import { CheckCircleOutline } from 'flowbite-svelte-icons';

	export let openToast = false;
</script>

<CheckCircleOutline
	slot="icon"
	class="h-5 w-5 bg-primary-100 text-green-500 dark:bg-green-800 dark:text-primary-200"
/>
Successfully saved!
