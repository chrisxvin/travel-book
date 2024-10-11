<script lang="ts">
import type { TimelineItem, } from "$lib/types";

import { DateTime } from "luxon";
import Sortable from "sortablejs";
import { TimelineEntryKind, TransportType } from "$lib/types";
import AddItemInPlace from "./add-item-in-place.svelte";
// import AddNewItem from "./add-new-item.svelte";
import EditTimelineItem from "./edit-timeline-item.svelte";
import { getDragging, getEditingItem } from "./stores.svelte";

interface IProps {
    date: string;
    timeline: TimelineItem[];
}
let props: IProps = $props();

const dateObj = DateTime.fromFormat(props.date, "yyyy-MM-dd");
let ulTimeline: HTMLUListElement;
let sortable: Sortable;
let dragging = getDragging();
let editingItem = getEditingItem();
let timeline = $state(props.timeline);

$effect(() => {
    sortable = Sortable.create(ulTimeline, {
        animation: 150,
        dragClass: "plan-editor-item-drag",
        ghostClass: "plan-editor-item-ghost",
        handle: ".plan-editor-item-handle",
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

</script>

<h2><span class="mdi mdi-calendar-today">&nbsp;{props.date}</span></h2>
<ul class="plan-editor" bind:this={ulTimeline}>
    {#each timeline as item, i}
        <li class="plan-editor-item">
            <span class="plan-editor-item-handle mdi mdi-drag-vertical justify-self-start text-3xl"></span>

            {#if item.kind === TimelineEntryKind.Unknown}
                <AddItemInPlace done={(kind) => doAddItemDone(i, kind)} cancel={() => doAddItemCancel(i)} />
            {:else}
                <EditTimelineItem {item} onEdit={() => editingItem.edit(i, item, timeline)} onDelete={() => doDeleteItem(i)} />
            {/if}

            <button class="add-btn-fix btn btn-circle text-3xl" onclick={() => btnAddNewItem_Inplace_Click(i)}>
                <span class="mdi mdi-plus"></span>
            </button>
            
        </li>
    {/each}
</ul>
