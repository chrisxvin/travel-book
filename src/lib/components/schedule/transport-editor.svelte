<script lang="ts">
import type { IScheduleEntry, ITransport } from "$lib/types";

import { onMount } from "svelte";

export let entry: IScheduleEntry | null;

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

function handlePlaceChanged(e: any) {
    console.log(e);
}

onMount(() => {
    initAutocomplete();
});
</script>

<div>
    <input class="form-control" type="text" placeholder="Location" id="transport-editor-ac" />
</div>
