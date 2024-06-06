<script lang="ts">
	import { goto } from '$app/navigation';
	import AdminTable from '$lib/components/admin/verificationTable/AdminTable.svelte';
	import { AngleLeftOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ userActivities } = data);
	const classId = $page.params.id;

	function gotoAdmin() {
		goto(`/admin/class/${classId}`);
	}
</script>

<div class="px-3">
	<AngleLeftOutline
		size="xl"
		color="#766D76"
		class="mb-5 w-fit cursor-pointer"
		on:click={gotoAdmin}
	/>
	<div class="mx-auto mb-3 grid max-w-[90%] gap-5 overflow-x-auto">
		<AdminTable userAct={userActivities} />
	</div>
</div>
