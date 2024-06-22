<script lang="ts">
import { loadScriptAsync } from "$lib/utils";
import { onMount, createEventDispatcher } from "svelte";
import { mapsLoaded, mapsLoading } from "./GoogleMapsStore";

interface IProps {
    apiKey: string;
    version?: "a" | "beta" | undefined;
    ready: Action;
}
let { apiKey, version, ready }: IProps = $props();

$effect(() => {
     $mapsLoaded && ready();
});

onMount(() => {
    window.GMapsReady = () => {
        mapsLoaded.set(true);
        delete window.GMapsReady;
    };

    if ($mapsLoaded) {
        ready();
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
            [{ type: "script", url: url.toString() }],
            () => {
                return $mapsLoaded;
            },
            () => {},
        );
    }
});
</script>
