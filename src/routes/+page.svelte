<script lang="ts">
	import { Label, Input, Button } from 'flowbite-svelte';
</script>

<div class="mx-auto w-[80vw] pt-10">
	<div class="mb-6">
		<Label for="username" class="mb-2 block">Large input</Label>
		<Input id="username" size="lg" placeholder="Username" />
	</div>
	<div class="mb-6">
		<Label for="default-input" class="mb-2 block">Default input</Label>
		<Input id="default-input" type="password" placeholder="Password" />
	</div>

	<Button>Log in</Button>
</div>
