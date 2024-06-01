<script lang="ts">
import type { IPlaceViewModel } from "$lib/types";

import { Place } from ".";

export let date: string;
export let schedule: IPlaceViewModel[];
</script>

<h2>{date}</h2>
<div class="accordion accordion-flush">
    {#each schedule as place}
        <div class="accordion-item">
            <div class="accordion-header" id={place._id + "_header"}>
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
