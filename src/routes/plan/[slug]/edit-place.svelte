<script lang="ts">
import { GoogleMapsPlacesAutocomplete } from "$lib/components";
import { GOOGLE_API_KEY } from "$lib/consts";

export let city = "";
export let place = "";

function handlePlaceChanged(e: CustomEvent) {
    console.log(e);
    transport && (transport.leaveFrom = e.detail.selectedPrediction);
}
</script>

<div class="card w-96 justify-center bg-base-100 shadow-lg">
    <figure><img src="/images/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg" alt="Place" /></figure>
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
