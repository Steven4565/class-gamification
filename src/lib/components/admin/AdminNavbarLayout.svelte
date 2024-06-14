<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
    import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons';
	import { AngleLeftOutline } from 'flowbite-svelte-icons';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';



	function gotoForAdmin(){
		if (window.history.length > 1) {
			window.history.back();
		} else {
			goto('/admin');
		}
	}
</script>

<AppBar background="bg-none">
	<svelte:fragment slot="lead">
        <p class="font-poppins font-medium text-slateLavender text-sm">Hi there! Here to check points?</p>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<form action="/?/logout" method="post">
			<button type="submit" class="btn w-full"><ArrowRightToBracketOutline size="lg" role="button" color="slateLavender"class="opacity-80"/></button>
		</form>
	</svelte:fragment>
</AppBar>

{#if $page.url.pathname !== '/admin'}
	<div class="mx-3">
		<AngleLeftOutline 
			size="xl"
			color="#766D76"
			class="w-fit cursor-pointer mb-5"
			on:click={gotoForAdmin}
		/>
	</div>
{/if}