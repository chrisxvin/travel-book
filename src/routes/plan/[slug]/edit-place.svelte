<script lang="ts">
import type { IPlace } from "$lib/types";

import { GoogleMapsPlacesAutocomplete } from "$lib/components";
import { GOOGLE_API_KEY } from "$lib/consts";

export let item: IPlace;

function gma_PlaceChanged(e: CustomEvent) {
    console.log(e);
    // transport && (transport.leaveFrom = e.detail.selectedPrediction);
    item.place = e.detail.selectedPrediction;
}
</script>

<div class="w-full bg-base-100">
    <!-- <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" on:placeChanged={gma_PlaceChanged} value={editingItem.city} language="zh" /> -->
    &nbsp;
    <label class="input input-bordered flex items-center gap-2">
        <span class="mdi mdi-city join-item"></span>
        <input type="text" class="grow" placeholder="City" bind:value={item.city} />
    </label>
    &nbsp;
    <label class="input input-bordered flex items-center gap-2">
        <span class="mdi mdi-map-marker"></span>
        <input type="text" class="grow" placeholder="Place" bind:value={item.place} />
    </label>
</div>
