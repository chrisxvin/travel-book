<script lang="ts">
import type { TimelineViewModel, TimelineItem } from "$lib/types";

import { TransportIcon } from "$lib/components";
import { TimelineEntryKind } from "$lib/types";
import Place from "./place.svelte";
import Transport from "./transport.svelte";
import Activity from "./activity.svelte";

export let timeline: TimelineItem[];

// function editItem(item: TimelineViewModel) {
//     item.isEditing = true;
//     timeline = timeline;
//     console.log("Edit", item);
// }

</script>

<ul class="timeline timeline-vertical">
    {#each timeline as item, i}
        <li class="border">
            <!-- {#if i !== 0}<hr />{/if} -->

            {#if item.kind === TimelineEntryKind.Place}
                <Place {item} />
            {:else if item.kind === TimelineEntryKind.Transport}
                <Transport {item} />
            {:else if item.kind === TimelineEntryKind.Activity}
                <Activity {item} />
            {/if}
            <!-- 
            <div class="timeline-start">
                <span>{item.leaveAt ?? ""}</span>
            </div>

            <div class="bg-circle timeline-middle">
                {#if item.kind === TimelineEntryKind.Place}
                    <span class="mdi mdi-map-marker text-lg"></span>
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
                    <span class="text-lg">{item.city}{item.place == null ? "" : ", " + item.place}</span>
                {:else if item.kind === TimelineEntryKind.Transport}
                    <div>
                        <span>{item.leaveFrom}</span>

                        <div>{item.serviceId}</div>
                        <p>{item.price}</p>
                        <p>{item.arriveTo}</p>
                    </div>
                {:else if item.kind === TimelineEntryKind.Activity}
                    <p>Activity: {item.act}</p>
                {/if}
            </div> -->

            <!-- <button class="btn btn-xs edit-btn-fix timeline-end" on:click={() => editItem(item)}>Edit</button> -->

            <!-- {#if i !== timeline.length}<hr />{/if} -->
        </li>
    {/each}
</ul>
