<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="mx-auto w-[80vw] pt-10">
	<h2 class="h2 pb-5">Log in</h2>
	<form use:enhance method="POST">
		<div class="mb-6">
			<label class="label">
				<input class="input p-2" type="text" name="id" placeholder="ID" required />
			</label>
		</div>
		<div class="mb-6">
			<label class="label mb-2 block">
				<input class="input p-2" name="password" type="password" placeholder="Password" required />
			</label>
		</div>
		{#if form?.message}
			<span class="text-red-500">{form?.message}</span>
		{/if}

		<button type="submit" class="variant-filled btn w-full">Log in</button>
	</form>
</div>
