<script lang="ts">
	import type { PageData } from "./$types";
    import { Card, Avatar, Button, Modal, Label, Textarea, Toast } from 'flowbite-svelte';
    import { PlusSolid, CircleCheckSolid, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { writable } from "svelte/store";
    import { tick } from 'svelte';
	import { enhance } from "$app/forms";
    import type { SubmitFunction } from '@sveltejs/kit';
    import { fade } from 'svelte/transition';

    export let data: PageData;

    const formModal = writable(false);
    const showToast = writable(false);

    const formControl: SubmitFunction = () => {
        return async(option) => {
            await option.update();
            $formModal = false;
            $popupModal = false;
            $showToast = true;
            setTimeout(() => $showToast = false, 2000)
        }
    }

    const selectedId = writable<Number>(undefined);
    const popupModal = writable(false);

    function DeleteAction(id: number) {
        $selectedId = id;
        $popupModal = true;
    }

    const activitySelected = writable(false);

</script>
<div class="w-full p-5">
    <div class="flex gap-10 items-center pb-4">
        <div>
            <p class="text-3xl font-medium text-gray-900 dark:text-white">{data.res?.name}</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{data.res?.description}</p>
        </div>
        <Button color="dark" class="h-fit py-3" on:click={() => ($activitySelected = $activitySelected? false : true)}>
            {#if $activitySelected}
                Members
            {:else}
                Activities
            {/if}
        </Button>
    </div>
    
    {#if $activitySelected}
        <div class="w-full">
            {#each data.res?.UserActivities || [] as asg}
                <Card class="min-w-full">
                    <div class="custom-grid">
                        <p class="text-md font-semibold text-gray-900 dark:text-white">{asg.user.id} has done his/her {asg.actionType.resetTime} Quest. ({asg.actionType.description})</p>
                        <p class="text-md font-semibold text-gray-900 dark:text-white">+{asg.actionType.experience}</p>
                        <input type="hidden" name="asgId">
                        <Button color="red" on:click={() => DeleteAction(asg.id)}>Delete</Button>
                    </div>
                </Card>
            {/each}
        </div>
    {:else}
        <div class="flex flex-wrap gap-3 mx-auto">
            {#each data.res?.userClass || [] as user}
                <Card padding="lg" class="max-w-48 min-h-48 hover:bg-gray-200 flex justify-center" href="#">
                    <div class="flex flex-col items-center">
                        <Avatar size="lg" class="mb-3" src="/images/profile-picture-3.webp" />
                        <h5 class="text-xl font-medium text-gray-900 dark:text-white">{user.userId}</h5>
                    </div>
                </Card>
            {/each}
        
            <Card padding="lg" class="max-w-48 min-h-48 flex items-center justify-center bg-gray-200 hover:bg-gray-300 cursor-pointer"
            on:click={() => {$formModal = true}}>
                <PlusSolid class="size-1/3"/>
            </Card>
        </div>
    {/if}

</div>

<Modal bind:open={$formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-3" method="POST" action="?/addStudent" use:enhance={formControl}>
      <h3 class="mb-2 text-xl font-medium text-gray-900 dark:text-white">Add Student</h3>
      <Label class="space-y-2">
        <span>NIM</span>
        <Textarea type="text" name="studentId" rows=3 class="flex text-wrap h-fit"/>
      </Label>
      <Button type="submit" class="w-full1">Add</Button>
    </form>
</Modal>

<Modal bind:open={$popupModal} size="xs" outsideclose autoclose={false}>
    <div class="text-center">
      <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
      <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this actvity?</h3>
      <form method="POST" action="?/removeAsg" use:enhance={formControl}>
        <input type="hidden" name="asgId" value={$selectedId}>
        <Button type="submit" color="red" class="me-2">Yes, I'm sure</Button>
      </form>
    </div>
</Modal>

<Toast bind:open={$showToast} transition={fade} class="fixed bottom-0 left-0 mb-4 ml-4 z-50" color="primary">
    <CircleCheckSolid slot="icon" class="w-5 h-5" />
    {#if $activitySelected}
        Activity Deleted
    {:else}
        User Added
    {/if}
</Toast>

<style>
    .custom-grid {
        display: grid;
        grid-template-columns: minmax(0,   1fr) auto auto;
        column-gap:  1rem;
        align-items: center; 
    }
</style>