<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<form method="post" use:enhance>
	<label>
		<span>Username</span>
		<input type="text" name="username" />
	</label>
	<label>
		<span>Password</span>
		<input type="password" name="password" />
	</label>
	<button>Sign up</button>
</form>
