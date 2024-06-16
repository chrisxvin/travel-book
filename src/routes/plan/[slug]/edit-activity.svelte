<script lang="ts">
import type { IActivity, IActivityViewModel } from "$lib/types";

import EditToggleButton from "./edit-toggle-button.svelte";

export let item: IActivityViewModel;

let editingItem: IActivityViewModel;

if (item.isEditing) editingItem = { ...item };

function btnEdit_Click() {
    editingItem = {
        ...item,
    };
    item.isEditing = true;
}

function btnSave_Click() {
    console.log("Saving place", editingItem);
    item = {
        ...editingItem,
    };
    item.isEditing = false;
}
</script>

<EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={item.isEditing} />

{#if item.isEditing}
    <div class="timeline-whole-row card w-full bg-base-100 shadow-md">
        <div class="card-body">
            <!-- <h2 class="card-title">Place</h2> -->

            <textarea class="textarea textarea-bordered" placeholder="Activity" bind:value={editingItem.activity}></textarea>
            <button class="btn w-24" on:click={btnSave_Click}><span class="mdi mdi-check"></span></button>
        </div>
    </div>
{/if}

<div class="timeline-middle">
    <span class="mdi mdi-check-circle"></span>
</div>

<div class="timeline-end">
    <span>Activity: {item.activity}</span>
</div>
