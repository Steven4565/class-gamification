<script lang="ts">
	import selectedClassStore from '$lib/stores/selectedClassStore';
	import { popup, ListBox, ListBoxItem, type PopupSettings } from '@skeletonlabs/skeleton';

	export let classes: {
		name: string;
		classId: number;
	}[];

	let comboboxValue: number = classes[0].classId;
	$: comboboxValue, selectedClassStore.set(comboboxValue);

	const popupCombobox: PopupSettings = {
		event: 'click',
		target: 'popupClass',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<button class="variant-filled-primary btn h-8 justify-between rounded-md" use:popup={popupCombobox}>
	<span class="capitalize">
		{classes.find((c) => c.classId === comboboxValue)?.name ?? classes[0].name}
	</span>
	<span>↓</span>
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
