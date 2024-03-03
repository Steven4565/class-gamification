<script lang="ts">
	import { AppBar, Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let username: String;
	export let id: String;

	const popupAvatar: PopupSettings = {
		event: 'click',
		target: 'popupAvatar',
		placement: 'bottom-start'
	};

	function signOut() {}
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/" class="bg-initial btn px-3">Home</a>
		<a href="/leaderboard" class="bg-initial btn px-3">Leaderboard</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<button use:popup={popupAvatar}>
			<Avatar src="https://placekitten.com/100/100" rounded="rounded-full" />
		</button>

		<div class="card w-72 p-4 shadow-xl" data-popup="popupAvatar">
			<div><p>{id}</p></div>
			<div><p>{username}</p></div>
			<hr />
			<nav class="list-nav">
				<ul>
					<li>
						<a href={'/user/' + id}>Profile</a>
					</li>
					<li>
						<button on:click={signOut} class="w-full">Logout</button>
					</li>
				</ul>
			</nav>
		</div>
	</svelte:fragment>
</AppBar>
