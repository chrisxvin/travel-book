<script lang="ts">
import { loadScriptAsync } from "$lib/utils";
import { onMount, createEventDispatcher } from "svelte";
import { writable } from "svelte/store";

export let apiKey;
export let version: "a" | "beta" | undefined = undefined;

export const mapsLoaded = writable(false);
export const mapsLoading = writable(false);

const dispatch = createEventDispatcher();
$: $mapsLoaded && dispatch("ready");

onMount(() => {
    window.GMapsReady = () => {
        mapsLoaded.set(true);
        delete window.GMapsReady;
    };

    if ($mapsLoaded) {
        dispatch("ready");
    }

    if (!$mapsLoading) {
        const url = new URL("/maps/api/js", "https://maps.googleapis.com");
        version && url.searchParams.set("v", version);
        url.searchParams.set("libraries", "places");
        url.searchParams.set("callback", "GMapsReady");
        url.searchParams.set("loading", "async");
        apiKey && url.searchParams.set("key", apiKey);

        mapsLoading.set(true);

        loadScriptAsync(
            [
                { type: "script", url: url.toString() },
            ],
            () => {
                return $mapsLoaded;
            },
            () => {},
        );
    }
});
</script>
