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
            {#if i !== 0}<hr />{/if}

            {#if item.kind === TimelineEntryKind.Place}
                <Place {item} />
            {:else if item.kind === TimelineEntryKind.Transport}
                <Transport {item} />
            {:else if item.kind === TimelineEntryKind.Activity}
                <Activity {item} />
            {/if}

            {#if i !== timeline.length}<hr />{/if}
        </li>
    {/each}
</ul>
