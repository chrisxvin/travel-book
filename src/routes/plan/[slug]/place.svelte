<script lang="ts">
import type { IPlace } from "$lib/types";

import { GoogleMapsPlacesAutocomplete } from "$lib/components";
import { GOOGLE_API_KEY } from "$lib/consts";

export let item: IPlace;
export let isEditing = false;

function handlePlaceChanged(e: CustomEvent) {
    console.log(e);
    // transport && (transport.leaveFrom = e.detail.selectedPrediction);
}

</script>

{#if isEditing}
    <div class="card w-96 justify-center bg-base-100 shadow-lg">
        <!-- <figure><img src="/images/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg" alt="Place" /></figure> -->
        <div class="card-body">
            <h2 class="card-title">Place</h2>

            <div class="join">
                <div>
                    <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" fields={[]} on:placeChanged={handlePlaceChanged} />
                    <!-- <input class="input input-bordered join-item" placeholder="Search"/> -->
                    <!-- <input type="text" class="grow" placeholder="Search" /> -->
                </div>

                <button class="btn join-item">Add</button>
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
