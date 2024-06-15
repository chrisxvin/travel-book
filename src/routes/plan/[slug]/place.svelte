<script lang="ts">
import type { IPlaceViewModel } from "$lib/types";

import { GoogleMapsPlacesAutocomplete } from "$lib/components";
import { GOOGLE_API_KEY } from "$lib/consts";

export let item: IPlaceViewModel;
let isEditing = false;

function handlePlaceChanged(e: CustomEvent) {
    console.log(e);
    // transport && (transport.leaveFrom = e.detail.selectedPrediction);
}

function savePlace() {
    console.log("Saving place");
    isEditing = false;
}
</script>

<hr />

<label class="edit-btn-fix swap timeline-end">
    <input type="checkbox" bind:checked={isEditing} />
    <span class="mdi mdi-close swap-on"></span>
    <span class=" mdi mdi-pencil swap-off"></span>
</label>

{#if isEditing}
    <div class="card timeline-whole-row w-96 grow bg-base-100 shadow-lg">
        <!-- <figure><img src="/images/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg" alt="Place" /></figure> -->
        <div class="card-body">
            <h2 class="card-title">Place</h2>

            <div class="join">
                <div>
                    <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" on:placeChanged={handlePlaceChanged} />
                    <!-- <input class="input input-bordered join-item" placeholder="Search"/> -->
                    <!-- <input type="text" class="grow" placeholder="Search" /> -->
                </div>

                <button class="btn join-item" on:click={savePlace}><span class="mdi mdi-check"></span></button>
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

<hr />

<!-- <div class="edit-btn-fix timeline-end">
    {#if isEditing}
        <button class="btn btn-xs" on:click={savePlace}>
            <span class="mdi mdi-check"></span>
        </button>
        <button class="btn btn-xs" on:click={() => (isEditing = false)}>
            <span class="mdi mdi-close"></span>
        </button>
    {:else}
        <button class="btn btn-xs" on:click={() => (isEditing = true)}>
            <span class="mdi mdi-pencil"></span>
        </button>
    {/if}
</div> -->
