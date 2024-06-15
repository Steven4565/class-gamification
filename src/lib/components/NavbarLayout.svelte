<script lang="ts">
	import { AppBar, Avatar, popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import ClassButton from './ClassButton.svelte';
	import selectedClassStore from '$lib/stores/selectedClassStore';

	interface ClassProp {
		classId: number;
		name: string;
	}

	export let username: string;
	export let id: string;
	export let classes: ClassProp[];

	let classId: number;
	$: classId;
	selectedClassStore.subscribe((_classId) => {
		classId = _classId;
	});

	const popupAvatar: PopupSettings = {
		event: 'click',
		target: 'popupAvatar',
		placement: 'bottom-start'
	};
</script>

<AppBar shadow="shadow-lg">
	<svelte:fragment slot="lead">
		<a href="/" class="bg-initial btn px-3">Home</a>
		<a href={`/leaderboard?classId=${classId}`} class="bg-initial btn px-3">Leaderboard</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<ClassButton {classes} />
		<button use:popup={popupAvatar}>
			<Avatar
				background="bg-surface-700"
				width="w-10"
				src="https://cdn.discordapp.com/avatars/322362818982707210/08c1e2a6eb0148f4f6cc9caa877ec668.webp?size=100"
				rounded="rounded-full"
			/>
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
						<form action="/?/logout" method="post">
							<button type="submit" class="btn w-full">Logout</button>
						</form>
					</li>
				</ul>
			</nav>
		</div>
	</svelte:fragment>
</AppBar>
