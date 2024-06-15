<script lang="ts">
	import { number } from 'zod';

	export let name: string;
	export let points: number;
	export let rank: number;
	export let className: string;
</script>

<div class="mt-5 flex items-center justify-between rounded-xl border-2 border-gray-300 px-4 py-2">
	<div class="flex gap-2">
		<div>
			<h4 class="font-bold">{rank}</h4>
		</div>
		<div class=" w-10 overflow-hidden rounded-full">
			<img
				src="https://t4.ftcdn.net/jpg/00/97/58/97/360_F_97589769_t45CqXyzjz0KXwoBZT9PRaWGHRk5hQqQ.jpg"
				alt=""
			/>
		</div>
		<div>
			<h5>{name}</h5>
			<h6 class="text-gray">{className}</h6>
		</div>
	</div>
	<div class="right">
		<p class="p text-right font-bold text-primary-400">{points} Points</p>
	</div>
</div>
