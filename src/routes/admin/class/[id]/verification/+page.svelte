<script lang="ts">
	import AdminTable from '$lib/components/admin/verificationTable/AdminTable.svelte';
	import type { TableUserActivity } from '$lib/types/verificationTable.js';

	export let data;
	export let userAct: TableUserActivity[] = data.userActivities;
</script>

<div class="mx-auto mb-3 grid max-w-[90%] gap-5 overflow-x-auto">
	<AdminTable {userAct} />
</div>
