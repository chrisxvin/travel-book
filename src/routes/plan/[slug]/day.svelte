<script lang="ts">
import type { IPlaceViewModel } from "$lib/types";

import Place from "./place.svelte";

export let date: string;
export let places: IPlaceViewModel[];
</script>

{#each places as place}
    <h3>
        <p>
            <span class="mdi mdi-map-marker">&nbsp;{place.city}{place.place == null ? "" : ", " + place.place}</span>
        </p>
    </h3>
    <Place {place} />
{/each}

<style lang="less" scoped>
p {
    margin-top: 1rem;
}

.accordion-button:not(.collapsed) {
    background-color: var(--bs-white);
}

.accordion-header {
    border-bottom: var(--bs-accordion-border-width) solid var(--bs-accordion-border-color) !important;
}
/*
.accordion-button {
    width: 4.5rem;
    margin-right: 0;
    margin-bottom: -4.5em;
    z-index: 2;
    position: relative;
}
*/
.accordion-item {
    border: 0 !important;
}

.accordion-collapse {
    border: 0 !important;
}

.accordion-body {
    padding: 1em 0;
}
</style>
