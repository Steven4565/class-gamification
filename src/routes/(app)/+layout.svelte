<script lang="ts">
	import { AppShell, Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
	import NavbarLayout from '$lib/components/NavbarLayout.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { page } from '$app/stores';

	export let data;
</script>

<AppShell>
	<svelte:fragment slot="header">
		{#if !$page.url.pathname.startsWith('/login') && !$page.url.pathname.startsWith('/admin')}
			<NavbarLayout
				username={data.user?.username ?? ''}
				id={data.user?.id ?? ''}
				classes={data.classes}
			/>
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
