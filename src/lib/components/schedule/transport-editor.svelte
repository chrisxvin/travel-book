<script lang="ts">
import { TimelineEntryKind, type ITimelineEntry, type ITransport } from "$lib/types";

import { onMount } from "svelte";
import { GoogleMapsPlacesAutocomplete } from "../common";
import { GOOGLE_API_KEY } from "$lib/consts";

export let entry: ITimelineEntry | null;
let transport = entry?.kind === TimelineEntryKind.Transport ? (entry as ITransport) : null;

/*
function initAutocomplete() {
    const input = document.getElementById("transport-editor-ac") as HTMLInputElement;
    const autocomplete = new google.maps.places.Autocomplete(input);
    // You can customize the autocomplete options here if needed.

    autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        // Handle the selected place (e.g., extract address components, coordinates, etc.).
        console.log(selectedPlace);
    });
}
*/
function handlePlaceChanged(e: CustomEvent) {
    console.log(e);
    transport && (transport.leaveFrom = e.detail.selectedPrediction);
}

onMount(() => {
    // initAutocomplete();
});
</script>

<div>
    <!-- <input class="form-control" type="text" placeholder="Location" id="transport-editor-ac" /> -->
    <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="form-control" fields={[]} on:placeChanged={handlePlaceChanged} />
    <p>{JSON.stringify(transport)}</p>
</div>
