<script lang="ts">
	import AdminTable from '$lib/components/admin/verificationTable/AdminTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ userActivities } = data);
</script>

<div class="px-3">
	<div class="mx-auto mb-3 grid max-w-[90%] gap-5 overflow-x-auto">
		<AdminTable userAct={userActivities} />
	</div>
</div>
