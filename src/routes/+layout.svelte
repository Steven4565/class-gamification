<script lang="ts">
	import '../app.pcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import NavbarLayout from '$lib/components/NavbarLayout.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import { page } from '$app/stores';

	export let data;
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if !$page.url.pathname.startsWith('/login') && !$page.url.pathname.startsWith('/admin')}
			<NavbarLayout name={data.user?.username ?? ''} id={data.user?.id ?? ''} />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
