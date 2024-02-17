<script lang="ts">
	import {
		Avatar,
		Dropdown,
		DropdownDivider,
		DropdownHeader,
		DropdownItem,
		NavLi,
		NavUl,
		Navbar
	} from 'flowbite-svelte';

	export let name: String;
	export let id: String;

	function signOut() {}
</script>

<Navbar let:NavContainer>
	<NavContainer class="flex justify-between">
		<NavUl>
			<NavLi href="/">Home</NavLi>
			<NavLi href="/leaderboard">Leaderboard</NavLi>
		</NavUl>
		<div class="flex items-center md:order-2">
			<Avatar id="avatar-menu" src="https://placekitten.com/100/100" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">{id}</span>
				<span class="tet-sm block truncate font-medium">{name}</span>
			</DropdownHeader>
			<DropdownItem href="/profile">Profile</DropdownItem>
			<DropdownDivider />
			<DropdownItem on:click={signOut}>Sign out</DropdownItem>
		</Dropdown>
	</NavContainer>
</Navbar>
