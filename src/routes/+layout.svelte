<script lang="ts">
	import '../app.pcss';
	import { Modal, type ModalComponent, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

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
	const modalRegistry: Record<string, ModalComponent> = {
		confirmModal: { ref: ConfirmModal },
		removeClassModal: { ref: RemoveClassModal },
		classFieldModal: { ref: ClassFieldModal },
		addUsersModal: { ref: AddUsersModal },
		deleteActionModal: { ref: DeleteActionModal }
	};
</script>

<!-- This div is used to remove the warning that these components does not have parents -->
<div>
	<Modal components={modalRegistry} />
	<Toast />
</div>

<slot />
