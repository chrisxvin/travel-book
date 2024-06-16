<script lang="ts">
import type { TimelineViewModel, TimelineItem, ITimelineEntry } from "$lib/types";

import { TimelineEntryKind, TransportType } from "$lib/types";
import Place from "./place.svelte";
import Transport from "./transport.svelte";
import Activity from "./activity.svelte";
import AddNewItem from "./add-new-item.svelte";
import type { AddNewItemEventArgs } from "./types";

export let timeline: TimelineViewModel[];

// function editItem(item: TimelineViewModel) {
//     item.isEditing = true;
//     timeline = timeline;
//     console.log("Edit", item);
// }
function doAddNewItem(e: CustomEvent<AddNewItemEventArgs>) {
    log(e);
    const kind = e.detail.kind;
    const newItem = {
        kind: kind,
        isEditing: true,
        // prettier-ignore
        ...(
            kind === TimelineEntryKind.Place ? { city: "NEW CITY", } :
            kind === TimelineEntryKind.Transport ? { travelBy: TransportType.Walk, currency: "GBP", } :
            kind === TimelineEntryKind.Activity ? { activity: "What do you like to do?", } : 
            {}
        ),
    } as TimelineViewModel;

    timeline.splice(e.detail.index + 1, 0, newItem);
    timeline = timeline;
}
</script>

<ul class="timeline timeline-vertical">
    {#each timeline as item, i}
        <li class="timeline-item border">
            {#if i !== 0}<hr />{/if}

            {#if item.kind === TimelineEntryKind.Place}
                <Place {item} />
            {:else if item.kind === TimelineEntryKind.Transport}
                <Transport {item} />
            {:else if item.kind === TimelineEntryKind.Activity}
                <Activity {item} />
            {/if}

            <!-- TODO: 这个添加按钮，能否做成单独的，根据 hover 的 item 来显示 -->
            <AddNewItem index={i} on:add={doAddNewItem} />
            <!--
            <button class="btn btn-circle text-3xl add-btn-fix">
                <span class="mdi mdi-plus"></span>
            </button>
            -->

            {#if i !== timeline.length}<hr />{/if}
        </li>
    {/each}
</ul>
