<script lang="ts">
	import AdminNavbarLayout from '$lib/components/admin/AdminNavbarLayout.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AdminNavbarLayout />
	</svelte:fragment>
	<slot />
</AppShell>
