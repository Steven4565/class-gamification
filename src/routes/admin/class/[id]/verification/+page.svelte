<script lang="ts">
	import { goto } from '$app/navigation';
	import AdminTable from '$lib/components/admin/verificationTable/AdminTable.svelte';
	import type { TableUserActivity } from '$lib/types/verificationTable.js';
	import { AngleLeftOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	
	export let data : PageData;
	let userAct : TableUserActivity[] = data.userActivities;
	const classId = $page.params.id;

	function gotoAdmin(){
		goto(`/admin/class/${classId}`)
	}
</script>

<div class="px-3">
	<AngleLeftOutline 
		size="xl"
		color="#766D76"
		class="w-fit cursor-pointer mb-5"
		on:click={gotoAdmin}
	/>
	<div class="mx-auto mb-3 grid max-w-[90%] gap-5 overflow-x-auto">
		<AdminTable {userAct}/>
	</div>
</div>


