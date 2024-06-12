<script lang="ts">
import type { TimelineItem } from "$lib/types";

import { TransportIcon } from "$lib/components";
import { Timeline } from "$lib/components/daisy-ui";
import { TimelineEntryKind } from "$lib/types";
import Place from "./place.svelte";

export let timeline: TimelineItem[];
</script>

<ul class="timeline timeline-vertical">
    {#each timeline as item, i}
        <li>
            {#if i !== 0}<hr />{/if}
            <div class="timeline-start">
                <span>{item.leaveAt ?? ""}</span>
            </div>

            <div class="timeline-middle">
                {#if item.kind === TimelineEntryKind.Place}
                    <span class="mdi mdi-map-marker"></span>
                {:else if item.kind === TimelineEntryKind.Transport}
                    <TransportIcon type={item.travelBy} />
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                {/if}
            </div>

            <div class="timeline-end">
                {#if item.kind === TimelineEntryKind.Place}
                    <span>{item.city}{item.place == null ? "" : ", " + item.place}</span>
                {:else if item.kind === TimelineEntryKind.Transport}
                    <div>{item.serviceId}</div>
                    <p>{item.price}</p>
                    <p>{item.arriveTo}</p>
                {:else if item.kind === TimelineEntryKind.Activity}
                    <p>Activity: {item.act}</p>
                {/if}
            </div>
            {#if i !== timeline.length}<hr />{/if}
        </li>
    {/each}
</ul>

<!-- <Timeline items={timeline} vertical={true}>
    <svelte:fragment slot="start" let:item>
        <span>{item.leaveAt ?? ""}</span>
    </svelte:fragment>

    <svelte:fragment slot="middle" let:item>
        {#if item.kind === TimelineEntryKind.Place}
            <span class="mdi mdi-map-marker"></span>
        {:else if item.kind === TimelineEntryKind.Transport}
            <TransportIcon type={item.travelBy} />
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
        {/if}
    </svelte:fragment>

    <svelte:fragment slot="end" let:item>
        {#if item.kind === TimelineEntryKind.Place}
            <span>{item.city}{item.place == null ? "" : ", " + item.place}</span>
        {:else if item.kind === TimelineEntryKind.Transport}
            <div>{item.serviceId}</div>
            <p>{item.price}</p>
            <p>{item.arriveTo}</p>
        {:else if item.kind === TimelineEntryKind.Activity}
            <p>Activity: {item.act}</p>
        {/if}
    </svelte:fragment>
</Timeline> -->

<!--
{#each timeline as place}
 <h3>
        <p>
            <span class="mdi mdi-map-marker">&nbsp;{place.city}{place.place == null ? "" : ", " + place.place}</span>
        </p>
    </h3>
    <Place {place} />
{/each}
 -->

<style lang="less" scoped>
p {
    margin-top: 1rem;
}

.timeline-start {
    align-self: start;
}

.timeline-middle {
    align-self: start;
    grid-row-start: 1;
    margin: 4px;
}

.timeline-end {
    align-self: start;
}

:where(.timeline > li) {
    grid-template-columns: var(--timeline-col-start, minmax(0, 0.25fr)) auto var(--timeline-col-end, minmax(0, 1fr) );
}
</style>
