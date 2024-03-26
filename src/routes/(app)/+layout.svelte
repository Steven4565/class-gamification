<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import NavbarLayout from '$lib/components/NavbarLayout.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if !$page.url.pathname.startsWith('/login')}
			<NavbarLayout
				username={data.user?.username ?? ''}
				id={data.user?.id ?? ''}
				classes={data.classes}
			/>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
