<script lang="ts">
	export let data;
	$: ({ user } = data);
	import { Heading } from 'flowbite-svelte';
</script>

<section>
	<div class="flex">
		<div class="h-max">
			<img src="https://placekitten.com/200/200" alt="" />
		</div>
		<div>
			<Heading>{user.username}</Heading>
			<Heading>{user.exp} Points</Heading>
			<div>
				<!-- TODO: input tags here -->
			</div>
		</div>
	</div>
</section>
