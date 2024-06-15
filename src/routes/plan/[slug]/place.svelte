<script lang="ts">
import type { IPlace } from "$lib/types";

import { GoogleMapsPlacesAutocomplete } from "$lib/components";
import { GOOGLE_API_KEY } from "$lib/consts";
import EditToggleButton from "./edit-toggle-button.svelte";

export let item: IPlace;

let editingItem: IPlace;
let isEditing = false;

function btnEdit_Click() {
    editingItem = {
        ...item,
    };
    isEditing = true;
}

function btnSave_Click() {
    console.log("Saving place", editingItem);
    item = {
        ...editingItem,
    };
    isEditing = false;
}

function gma_PlaceChanged(e: CustomEvent) {
    console.log(e);
    // transport && (transport.leaveFrom = e.detail.selectedPrediction);
    editingItem.place = e.detail.selectedPrediction;
}
</script>

{#if !isEditing}
    <hr />
{/if}

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
<EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={isEditing} />

{#if isEditing}
    <div class="timeline-whole-row card w-full bg-base-100 shadow-md">
        <!-- <figure><img src="/images/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg" alt="Place" /></figure> -->
        <div class="card-body">
            <!-- <h2 class="card-title">Place</h2> -->

            <div class="join">
                <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" on:placeChanged={gma_PlaceChanged} value={editingItem.city} />
                <!-- <input class="input input-bordered join-item" placeholder="Search"/> -->
                <!-- <input type="text" class="grow" placeholder="Search" /> -->

                <button class="btn join-item" on:click={btnSave_Click}><span class="mdi mdi-check"></span></button>
            </div>
        </div>
    </div>
{:else}
    <!-- 图标 -->
    <div class="bg-circle timeline-middle">
        <span class="mdi mdi-map-marker text-lg"></span>
    </div>

    <!-- 城市和地点 -->
    <div class="timeline-end">
        <span class="text-lg">{item.city}{item.place == null ? "" : ", " + item.place}</span>
    </div>
{/if}

{#if !isEditing}
    <hr />
{/if}
