<script lang="ts">
	import { Avatar, ProgressBar } from '@skeletonlabs/skeleton';

	export let user: {
		username: string;
		id: string;
		exp: number;
		title: string;
	};

	export let currExp: number;
	export let nextExp: number;
	export let title: string;
</script>

<div class=" flex items-center">
	<div class="m-7 h-max">
		<Avatar
			initials="US"
			width="w-32"
			background="bg-surface-800"
			src="https://cdn.discordapp.com/avatars/322362818982707210/08c1e2a6eb0148f4f6cc9caa877ec668.webp?size=100"
		/>
	</div>
	<div class="w-full">
		<div class="flex w-full justify-between">
			<div>
				<p>{title}</p>
				<h1 class="h1 text-2xl font-bold">{user.username}</h1>
				<p class="p">{user.id}</p>
			</div>
			<h3 class="h3 text-3xl font-bold text-primary-500">{currExp} POINTS</h3>
		</div>
		<div class="flex items-center justify-center gap-3">
			<ProgressBar
				label="Progress Bar"
				value={currExp}
				max={nextExp}
				height="h-5"
				track="bg-surface-600"
			/>
			<span class="font-bold">{currExp}/{nextExp}</span>
		</div>
	</div>
</div>
