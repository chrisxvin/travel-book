<script lang="ts">
import type { IPlace, IPlaceViewModel } from "$lib/types";

import { GoogleMapsPlacesAutocomplete } from "$lib/components";
import { GOOGLE_API_KEY } from "$lib/consts";
import EditToggleButton from "./edit-toggle-button.svelte";

export let item: IPlaceViewModel;

let editingItem: IPlaceViewModel;

// 如果传入的 item 正在编辑状态，那么拷贝一份到 editingItem
if (item.isEditing) editingItem = { ...item };

function btnEdit_Click() {
    editingItem = {
        ...item,
    };
    item.isEditing = true;
}

function gma_PlaceChanged(e: CustomEvent) {
    console.log(e);
    // transport && (transport.leaveFrom = e.detail.selectedPrediction);
    editingItem.place = e.detail.selectedPrediction;
}
</script>

<!--
<div class="edit-btn-fix timeline-end">
    {#if isEditing}
        <button class="btn btn-xs" on:click={() => (isEditing = false)}>
            <span class="mdi mdi-close"></span>
        </button>
    {:else}
        <button class="btn btn-xs" on:click={btnEdit_Click}>
            <span class="mdi mdi-pencil"></span>
        </button>
    {/if}
</div>
-->
<!-- <EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={item.isEditing} /> -->

<!-- 图标 -->
<div class="timeline-middle">
    <p>
        <span class="mdi mdi-map-marker text-lg"></span>
    </p>
</div>

<!-- 城市和地点 -->
<div class="timeline-end">
    <p class="text-lg">{item.city}{item.place == null ? "" : ", " + item.place}</p>
</div>
