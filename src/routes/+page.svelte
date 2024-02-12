<script lang="ts">
	import ActionButton from '$lib/components/ActionButton.svelte';
	import { Heading } from 'flowbite-svelte';

	export let data;
	let { activities } = data.props;
</script>

<div>
	<Heading tag="h2" class="m-5 text-center">Activities</Heading>
	<div class="flex items-center justify-center gap-10">
		{#each activities as activity}
			<ActionButton {activity} />
		{/each}
	</div>
</div>
