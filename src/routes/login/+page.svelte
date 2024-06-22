<script lang="ts">
	import { enhance } from '$app/forms';
	import LoginBackground from '$lib/assets/login/LoginGradient.png';
	import LoginImage from '$lib/assets/login/LoginImage.png';
	export let form;
</script>

<div class="grid h-full w-full place-items-center bg-primary-400">
	<div
		class="mx-auto flex h-[600px] max-h-[90%] w-[1200px] max-w-[80%] overflow-hidden rounded-3xl bg-white"
	>
		<div class=" grid h-full w-1/2 place-items-center bg-white">
			<div class="h-[400px] w-[300px]">
				<h2 class="h2 pb-1 text-center font-bold">LOGIN</h2>
				<p class="p pb-10 text-center">Hi, here to check your points?</p>
				<form use:enhance method="POST">
					<div class="mb-6">
						<label class="label">
							<span class="font-bold">User ID</span>
							<input
								class="input variant-form-material bg-slate-200 p-2"
								type="text"
								name="id"
								placeholder="26xxxxxxxx"
								required
							/>
						</label>
					</div>
					<div class="mb-6">
						<label class="label mb-2 block">
							<span class="font-bold">Password</span>
							<input
								class="input variant-form-material bg-slate-200 p-2"
								name="password"
								type="password"
								placeholder="Password"
								required
							/>
						</label>
					</div>
					{#if form?.message}
						<span class="text-red-500">{form?.message}</span>
					{/if}

					<button
						type="submit"
						class="variant-filled-primary btn w-full rounded-md !bg-primary-400 text-lg font-bold"
					>
						LOGIN
					</button>
				</form>
			</div>
		</div>
		<div class="relative h-full w-1/2">
			<img
				src={LoginImage}
				alt="Login Background"
				class="absolute left-0 top-0 z-10 h-full w-full object-cover"
				draggable={false}
			/>
		</div>
	</div>
</div>
