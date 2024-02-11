<script lang="ts">
	import { enhance } from '$app/forms';
	import { Label, Input, Button } from 'flowbite-svelte';
</script>

<div class="mx-auto w-[80vw] pt-10">
	<form use:enhance method="POST">
		<div class="mb-6">
			<Label class="mb-2">
				<Input type="text" name="username" placeholder="Username" required />
			</Label>
		</div>
		<div class="mb-6">
			<Label class="mb-2 block">
				<Input name="password" type="password" placeholder="Password" required />
			</Label>
		</div>

		<Button type="submit">Log in</Button>
	</form>
</div>
