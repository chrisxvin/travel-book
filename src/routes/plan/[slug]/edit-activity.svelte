<script lang="ts">
import type { IActivity, IActivityViewModel } from "$lib/types";

import EditToggleButton from "./edit-toggle-button.svelte";

export let item: IActivityViewModel;

function btnSave_Click() {
    // console.log("Saving place", editingItem);
    // item = {
    //     ...editingItem,
    // };
    // item.isEditing = false;
}
</script>

<!-- <EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={item.isEditing} /> -->

<div class="timeline-whole-row card w-full bg-base-100 shadow-md">
    <div class="card-body">
        <!-- <h2 class="card-title">Place</h2> -->

        <textarea class="textarea textarea-bordered" placeholder="Activity" bind:value={item.activity}></textarea>
        <button class="btn w-24" on:click={btnSave_Click}><span class="mdi mdi-check"></span></button>
    </div>
</div>
