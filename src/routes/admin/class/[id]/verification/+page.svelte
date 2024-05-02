<script lang="ts">
	import type { PageData } from './$types';
    import { studentActivityDownloadExcel } from '$lib/utils/exportToExcel';

    export let data: PageData;
</script>

<button on:click={() => studentActivityDownloadExcel(data.userActivities)}>Export to excel</button>
