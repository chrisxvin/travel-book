<script lang="ts">
import type { IPlaceViewModel } from "$lib/types";

import { Place } from ".";

export let date: string;
export let places: IPlaceViewModel[];
</script>

<h2>{date}</h2>
<div class="accordion accordion-flush">
    {#each places as place}
        <div class="accordion-item">
            <div class="accordion-header" id={place._id + "_header"}>
                <div class="d-flex flex-row">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#" + place._id}
                        aria-expanded="true"
                        aria-controls={place._id}>
                        <h3>
                            <span class="mdi mdi-map-marker"></span>
                            <span>{place.city}{place.place == null ? "" : ", " + place.place}</span>
                        </h3>
                    </button>
                </div>
            </div>
            <div id={place._id} class="accordion-collapse collapse show" aria-labelledby={place._id + "_header"}>
                <div class="accordion-body">
                    <Place {place} />
                </div>
            </div>
        </div>
    {/each}
</div>

<style lang="less" scoped>
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
