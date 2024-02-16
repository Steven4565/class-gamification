<script>
	import { Toast } from 'flowbite-svelte';
	import { XCircleOutline } from 'flowbite-svelte-icons';
</script>

i<Toast>
	<XCircleOutline
		slot="icon"
		class="h-5 w-5 bg-primary-100 text-primary-500 dark:bg-primary-800 dark:text-primary-200"
	/>
	Set yourself free.
</Toast>
