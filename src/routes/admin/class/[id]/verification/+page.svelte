<script lang="ts">
	  import type { PageData } from './$types';
    import AdminTable from '$lib/components/admin/AdminTable.svelte';

    export let data: PageData;
    export let userAct = data.userActivities;

</script>

<div class="mx-auto grid max-w-[90%] gap-5 mb-3 overflow-x-auto">
  <AdminTable userAct={userAct}/>
</div>



