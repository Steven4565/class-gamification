<script lang="ts">
	import { Modal } from 'flowbite-svelte';

	export let open = false;
</script>

<Modal bind:open>
	<div class="p-5">
		<h2 class="mb-5 text-2xl font-bold">Test Modal</h2>
		<p class="mb-5">This is a test modal.</p>
		<button class="btn btn-primary" on:click={() => (open = false)}>Close</button>
	</div>
</Modal>
