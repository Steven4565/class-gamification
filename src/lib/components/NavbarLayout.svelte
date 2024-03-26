<script lang="ts">
	import {
		AppBar,
		Avatar,
		ListBox,
		ListBoxItem,
		popup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	import selectedClassStore from '$lib/stores/selectedClassStore';
	import { get } from 'svelte/store';

	interface ClassProp {
		classId: number;
		name: string;
	}

	export let username: string;
	export let id: string;
	export let classes: ClassProp[];

	const popupAvatar: PopupSettings = {
		event: 'click',
		target: 'popupAvatar',
		placement: 'bottom-start'
	};

	let comboboxValue: number = classes[0].classId;
	$: comboboxValue, selectedClassStore.set(comboboxValue);

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupClass',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<AppBar shadow="shadow-lg">
	<svelte:fragment slot="lead">
		<a href="/" class="bg-initial btn px-3">Home</a>
		<a href="/leaderboard" class="bg-initial btn px-3">Leaderboard</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<button
			class="variant-filled-primary btn h-8 justify-between rounded-md"
			use:popup={popupCombobox}
		>
			<span class="capitalize">
				{classes.find((c) => c.classId === comboboxValue)?.name ?? classes[0].name}
			</span>
			<span>↓</span>
		</button>

		<button use:popup={popupAvatar}>
			<Avatar
				background="bg-surface-700"
				width="w-10"
				src="https://cdn.discordapp.com/avatars/322362818982707210/08c1e2a6eb0148f4f6cc9caa877ec668.webp?size=100"
				rounded="rounded-full"
			/>
		</button>

		<div class="card w-48 py-2 shadow-xl" data-popup="popupClass">
			<ListBox rounded="rounded-none">
				{#if classes}
					{#each classes as _class}
						<ListBoxItem bind:group={comboboxValue} name="class" value={_class.classId}>
							{_class.name}
						</ListBoxItem>
					{/each}
				{/if}
			</ListBox>
			<div class="bg-surface-100-800-token arrow" />
		</div>

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
