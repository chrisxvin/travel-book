<script lang="ts">
import GoogleMapsSdk from "./GoogleMapsSdk.svelte";
import { createEventDispatcher } from "svelte";

interface IProps {
    id: string;
    apiKey: string;
    ariaLabel: string;
    placeholder: string;
    styleClass: string;
    value: any;
    viewValue: any;
    viewLabel: keyof google.maps.places.PlaceResult;
    fields: string[];
    types: string[];
    options: any;
}
let {
    id = `gm-autocomplete-${Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5)}`,
    apiKey,
    ariaLabel = "location",
    placeholder = "Location",
    styleClass = "",
    value = null,
    viewValue = null,
    viewLabel = "formatted_address",
    fields = ["address_components", "geometry", "place_id", "plus_code", viewLabel],
    types = [],
    options = {},
}: IProps = $props();

let search: HTMLInputElement;
let autocomplete: google.maps.places.Autocomplete;
let currentPlace: google.maps.places.PlaceResult | null;
let disabled = $state(true);

const dispatch = createEventDispatcher();

export function clear() {
    value = null;
    viewValue = null;
    currentPlace = null;

    dispatch("clear");
}

function dropdownVisible() {
    return (document.querySelectorAll(".pac-container")[0] as any).offsetParent !== null;
}

function autocompleteKeydown(e: KeyboardEvent) {
    if (e.keyCode === 13 && dropdownVisible()) {
        e.preventDefault();
    }
}

function blur() {
    dispatch("blur");
    if (viewValue !== (currentPlace && /*currentPlace[viewLabel]*/ search.value)) {
        clear();
    }
}

function init() {
    disabled = false;

    const opts = Object.assign(
        {
            fields,
            types,
        },
        options,
    );
    autocomplete = new google.maps.places.Autocomplete(search, opts);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (place.geometry) {
            // viewValue = place[viewLabel];
            viewValue = search.value;
            value = viewValue;
            currentPlace = place;
            dispatch("placeChanged", {
                place,
                selectedPrediction: search.value,
            });
        }
    });

    dispatch("ready");
}
</script>

<GoogleMapsSdk {apiKey} ready={init} />
<input {id} aria-label={ariaLabel} class={styleClass} {placeholder} bind:this={search} type="text" {disabled} bind:value={viewValue} onblur={blur} onkeydown={autocompleteKeydown} />
