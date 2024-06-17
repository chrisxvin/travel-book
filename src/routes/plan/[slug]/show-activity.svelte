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

</script>

<!-- <EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={item.isEditing} /> -->

<div class="timeline-middle">
    <span class="mdi mdi-check-circle"></span>
</div>

<div class="timeline-end">
    <span>Activity: {item.activity}</span>
</div>
