<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex h-full items-center justify-center">
	<div
		class="card mx-auto flex h-[200px] w-[300px] flex-col items-center justify-center p-10 text-center shadow-md"
	>
		<h1 class="h1"><b>{$page?.status}</b></h1>
		<h3 class="h3">{$page?.error?.message ?? 'Something went wrong'}</h3>
	</div>
</div>
