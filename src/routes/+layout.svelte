<script lang="ts">
	import '../app.pcss';
	import { AppShell, Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
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
	import RemoveClassModal from '$lib/components/admin/modals/RemoveClassModal.svelte';
	import ClassFieldModal from '$lib/components/admin/modals/ClassFieldModal.svelte';
	import AddUsersModal from '$lib/components/admin/modals/AddUsersModal.svelte';
	import DeleteActionModal from '$lib/components/admin/modals/DeleteActionModal.svelte';
	import AdminNavbarLayout from '$lib/components/admin/AdminNavbarLayout.svelte';
	import RemoveUserModal from '$lib/components/admin/modals/RemoveUserModal.svelte';
	const modalRegistry: Record<string, ModalComponent> = {
		confirmModal: { ref: ConfirmModal },
		removeClassModal: { ref: RemoveClassModal },
		classFieldModal: { ref: ClassFieldModal },
		addUsersModal: { ref: AddUsersModal },
		deleteActionModal: { ref: DeleteActionModal },
		removeUserModal: { ref: RemoveUserModal }
	};

	export let data;
</script>

<!-- This div is used to remove the warning that these components does not have parents -->
<div>
	<Modal components={modalRegistry} />
	<Toast />
</div>

<AppShell>
	<svelte:fragment slot="header">
		{#if !$page.url.pathname.startsWith('/login') && !$page.url.pathname.startsWith('/admin')}
			<NavbarLayout username={data.user?.username ?? ''} id={data.user?.id ?? ''} />
		{:else if !$page.url.pathname.startsWith('/login') && $page.url.pathname.startsWith('/admin')}
			<AdminNavbarLayout />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
