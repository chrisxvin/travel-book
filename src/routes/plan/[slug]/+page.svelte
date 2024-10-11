<script lang="ts">
import type { PageData } from "./$types";

import { page } from "$app/stores";
import { TimelineEntryKind } from "$lib/types";
import Day from "./day.svelte";
import { getTracking } from "./stores.svelte";

let {
    data,
}: {
    data: PageData;
} = $props();
export const plan = data.plan;

let tabIndex = $state(0);
let tracking = getTracking();
let path = $derived($page.url.pathname);

function btnEdit_Click() {}
</script>

<!-- edit toolbar -->
<section class="join">
    <a class="btn btn-primary join-item" data-sveltekit-preload-data="tap" href={path + "/edit"}>Edit</a>
</section>

<section class="plan">
    <div class="flex flex-row justify-between">
        <h1>{plan.title}</h1>
        <!-- <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p> -->
        <span>&nbsp;</span>
        <label class="label cursor-pointer">
            <span class="label-text">Tracking&nbsp;</span>
            <input type="checkbox" class="toggle toggle-primary" bind:checked={tracking.value} />
        </label>
    </div>

    {#each plan.itinerary as { date, timeline }, i}
        <Day {date} {timeline} />
    {/each}
</section>
