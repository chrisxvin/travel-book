<script lang="ts">
import type { TimelineItem, } from "$lib/types";

import { DateTime } from "luxon";
import Sortable from "sortablejs";
import { TimelineEntryKind, TransportType } from "$lib/types";
import ShowPlace from "./show-place.svelte";
import ShowTransport from "./show-transport.svelte";
import ShowActivity from "./show-activity.svelte";
import AddItemInPlace from "./add-item-in-place.svelte";
import AddNewItem from "./add-new-item.svelte";
import ShowTimelineItem from "./show-timeline-item.svelte";
import { getDragging, getTracking, getEditingItem } from "./stores.svelte";
import { stringToTime } from "$lib/utils";

interface IProps {
    date: string;
    timeline: TimelineItem[];
}
let props: IProps = $props();

const dateObj = DateTime.fromFormat(props.date, "yyyy-MM-dd");
let ulTimeline: HTMLUListElement;
let sortable: Sortable;
let dragging = getDragging();
let tracking = getTracking();
let editingItem = getEditingItem();
let timeline = $state(props.timeline);

$effect(() => {
    sortable = Sortable.create(ulTimeline, {
        animation: 150,
        dragClass: "timeline-item-drag",
        ghostClass: "timeline-item-ghost",
        handle: ".timeline-handle",
        onStart: e => {
            dragging.value = true;
        },
        onEnd: e => {
            dragging.value = false;
        },
    });
});

function btnAddNewItem_Inplace_Click(index: number) {
    const newItemChooser: TimelineItem = {
        kind: TimelineEntryKind.Unknown,
    };

    timeline.splice(index + 1, 0, newItemChooser);
}

function doAddItemCancel(index: number) {
    timeline.splice(index, 1);
}

function doAddItemDone(index: number, kind: TimelineEntryKind) {
    const newItem = timeline[index] = {
        kind,
        // prettier-ignore
        ...(
            // kind === TimelineEntryKind.Unknown ? {} :
            kind === TimelineEntryKind.Place ? { city: "A new place", } :
            kind === TimelineEntryKind.Transport ? { travelBy: TransportType.Train, currency: "GBP", } :
            kind === TimelineEntryKind.Activity ? { activity: "What do you like to do?", } : 
            {}
        ) as any,
    };

    editingItem.edit(index, newItem, timeline);
}

function doDeleteItem(index: number) {
    if (confirm("Sure?")) {
        timeline.splice(index, 1);
    }
}

function isCurrentTrackingItem(index: number, isTracking: boolean): boolean {
    let item = timeline[index];
    if (isTracking && dateObj.isValid && item.kind === TimelineEntryKind.Transport) {
        const now = DateTime.now();
        let result = stringToTime(item.leaveAt) <= now && stringToTime(item.arriveAt) >= now;
        return result;
    } else {
        return false;
    }
}
</script>

<h2><span class="mdi mdi-calendar-today">&nbsp;{props.date}</span></h2>
<ul class="timeline timeline-vertical" bind:this={ulTimeline}>
    {#each timeline as item, i}
        <!--                                                    TODO: change here later, when add time property to ITimelineEntry -->
        <li class="timeline-item border" class:tracking-border={isCurrentTrackingItem(i, tracking.value)}>
            {#if i !== 0 && item.kind !== TimelineEntryKind.Unknown}<hr class="bg-info-200" />{/if}
            <span class="timeline-handle mdi mdi-drag-vertical justify-self-start text-3xl"></span>

            {#if item.kind === TimelineEntryKind.Unknown}
                <AddItemInPlace done={(kind) => doAddItemDone(i, kind)} cancel={() => doAddItemCancel(i)} />
            {:else}
                <ShowTimelineItem {item} onAdd={() => btnAddNewItem_Inplace_Click(i)} onEdit={() => editingItem.edit(i, item, timeline)} onDelete={() => doDeleteItem(i)} />
            {/if}

            <!-- <AddNewItem hidden={dragging} add={args => editingItem.add(i, args.kind, timeline)} /> -->

            {#if i !== timeline.length - 1 && item.kind !== TimelineEntryKind.Unknown}<hr class="bg-info-200" />{/if}
        </li>
    {/each}
</ul>
