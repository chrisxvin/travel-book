<script lang="ts">
import type { IPlace } from "$lib/types";

import { GoogleMapsPlacesAutocomplete } from "$lib/components";
import { GOOGLE_API_KEY } from "$lib/consts";

interface IProps {
    item: IPlace;
}
let { item }: IProps = $props();

function gma_PlaceChanged(e: CustomEvent) {
    console.log(e);
    // transport && (transport.departFrom = e.detail.selectedPrediction);
    item.place = e.detail.selectedPrediction;
}
</script>

<!-- 图标 -->
<div class="">
    <span class="mdi mdi-map-marker text-2xl text-info"></span>
    <span class="text-lg">City</span>
</div>

<div class="grid w-full grid-cols-2 gap-2 bg-base-100">
    <!-- <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" onplaceChanged={gma_PlaceChanged} value={editingItem.city} language="zh" /> -->
    <label class="input input-bordered flex items-center gap-2">
        <span class="mdi mdi-city join-item"></span>
        <input type="text" class="grow" placeholder="City" bind:value={item.city} />
    </label>

    <label class="input input-bordered flex items-center gap-2">
        <span class="mdi mdi-map-marker"></span>
        <input type="text" class="grow" placeholder="Place" bind:value={item.place} />
    </label>
</div>
