<script lang="ts">
import type { IPlaceViewModel } from "$lib/types";

import { Place } from ".";

export let date: string;
export let places: IPlaceViewModel[];
</script>

<div class="accordion-item">
    <div class="accordion-header" id={date + "_header"}>
        <div class="d-flex flex-row">
            <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#" + date}
                aria-expanded="true"
                aria-controls={date}>
                <h2><span class="mdi mdi-calendar-today">&nbsp;{date}</span></h2>
            </button>
        </div>
    </div>
    <div id={date} class="accordion-collapse collapse show" aria-labelledby={date + "_header"}>
        <div class="accordion-body">
            {#each places as place}
                <h3>
                    <p>
                        <span class="mdi mdi-map-marker">&nbsp;{place.city}{place.place == null ? "" : ", " + place.place}</span>
                    </p>
                </h3>
                <Place {place} />
            {/each}
        </div>
    </div>
</div>

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
