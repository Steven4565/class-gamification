<script lang="ts">
	import '../app.pcss';
	import { AppShell, AppBar, Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
	import NavbarLayout from '$lib/components/NavbarLayout.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { page } from '$app/stores';

	// Popup settings
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	// Initialize stores
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	// Initialize component modals
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	const modalRegistry: Record<string, ModalComponent> = {
		confirmModal: { ref: ConfirmModal }
		// ...
	};

	export let data;
</script>

<Modal components={modalRegistry} />
<Toast />

<AppShell>
	<svelte:fragment slot="header">
		{#if !$page.url.pathname.startsWith('/login') && !$page.url.pathname.startsWith('/admin')}
			<NavbarLayout name={data.user?.username ?? ''} id={data.user?.id ?? ''} />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
