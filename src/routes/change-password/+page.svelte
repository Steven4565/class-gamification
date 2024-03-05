<script lang="ts">
	import { USERNAME } from '$env/static/private';

	export let data;
	export let form;

	const inputClass = 'input variant-form-material p-2 ';
</script>

<main class="flex h-full w-full items-center justify-center">
	<form method="post">
		<div class="mx-auto grid min-w-[200px] grid-cols-1 gap-3 rounded-md p-10 shadow-xl">
			<h2 class="h2">Please change your password</h2>
			<label class="label">
				<input class={inputClass} type="text" name="id" value={data.id} disabled />
			</label>
			<label class="label">
				<input class={inputClass} type="text" name="username" placeholder="Username" required />
				{#if form?.errors?.username}
					<span class="text-red-500">{form?.errors?.username}</span>
				{/if}
			</label>
			<label class="label">
				<input class={inputClass} type="text" name="password" placeholder="Password" required />
				{#if form?.errors?.password}
					<span class="text-red-500">{form?.errors?.password}</span>
				{/if}
			</label>
			<label class="label">
				<input
					class={inputClass}
					type="text"
					name="confirmPassword"
					placeholder="Confirm Password"
					required
				/>
				{#if form?.errors?.confirmPassword}
					<span class="text-red-500">{form?.errors?.confirmPassword}</span>
				{/if}
			</label>
			<button class="variant-filled-primary btn w-full rounded-md">Change Password</button>
		</div>
	</form>
</main>
