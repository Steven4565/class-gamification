<script lang="ts">
	import NavbarLayout from '$lib/components/NavbarLayout.svelte';
	import { page } from '$app/stores';

	import '../app.pcss';

	export let data;
</script>

{#if !$page.url.pathname.startsWith('/login') && !$page.url.pathname.startsWith('/admin')}
	<NavbarLayout name={data.user?.username ?? ''} id={data.user?.id ?? ''} />
{/if}
<slot />
