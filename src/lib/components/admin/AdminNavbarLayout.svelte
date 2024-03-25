<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
    import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons';

	function signOut() {}
</script>

<AppBar background="bg-none">
	<svelte:fragment slot="lead">
        <p class="font-poppins font-medium text-slateLavender text-sm">Hi there! Here to check points?</p>
	</svelte:fragment>
	<svelte:fragment slot="trail">
        <ArrowRightToBracketOutline size="lg" role="button" color="slateLavender" on:click={signOut} class="opacity-80"/>
	</svelte:fragment>
</AppBar>
