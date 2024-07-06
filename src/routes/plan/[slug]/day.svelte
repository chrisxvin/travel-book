<script lang="ts">
import type { TimelineViewModel, TimelineItem, ITimelineEntry, IPlaceViewModel, ITransportViewModel, IActivityViewModel } from "$lib/types";
import type { AddNewItemEventArgs } from "./types";

import { DateTime } from "luxon";
import Sortable from "sortablejs";
import { TimelineEntryKind, TransportType } from "$lib/types";
import ShowPlace from "./show-place.svelte";
import ShowTransport from "./show-transport.svelte";
import ShowActivity from "./show-activity.svelte";
import AddNewItem from "./add-new-item.svelte";
import { EditMode } from "./types";
import { getTracking, getEditingItem } from "./stores.svelte";
import { stringToTime } from "$lib/utils";

interface IProps {
    date: string;
    timeline: TimelineItem[];
}
let { date, timeline }: IProps = $props();

const dateObj = DateTime.fromFormat(date, "yyyy-MM-dd");
let editMode: EditMode = EditMode.None;
// let editingItem: TimelineItem | undefined = $state();
let editingIndex = -1;
let editingType: TimelineEntryKind = $state(TimelineEntryKind.Unknown);
let ulTimeline: HTMLUListElement;
let sortable: Sortable;
let dragging = $state(false);
let tracking = getTracking();
let editingItem = getEditingItem();

$effect(() => {
    sortable = Sortable.create(ulTimeline, {
        animation: 150,
        dragClass: "timeline-item-drag",
        ghostClass: "timeline-item-ghost",
        handle: ".timeline-handle",
        onStart: e => {
            dragging = true;
        },
        onEnd: e => {
            dragging = false;
        },
    });
});

function EditItem(index: number, item: TimelineItem) {
    /*
    editingType = item.kind;
    editingIndex = index;
    editingItem = { ...item };
    editMode = EditMode.Edit;
    dlgEdit.showModal();
    */

    editingItem.value = {
        index,
        item: { ...item },
        isEditing: true,
        mode: EditMode.Edit,
    };
}

function btnAddNewItem_Click(args: AddNewItemEventArgs) {
    // log(args);
    /*
    editMode = EditMode.Add;
    editingIndex = args.index;
    editingType = args.kind;
    const editingItem = {
        kind: editingType,
        // isEditing: true,
        // prettier-ignore
        ...(
            editingType === TimelineEntryKind.Place ? { city: "NEW CITY", } :
            editingType === TimelineEntryKind.Transport ? { travelBy: TransportType.Walk, currency: "GBP", } :
            editingType === TimelineEntryKind.Activity ? { activity: "What do you like to do?", } : 
            {}
        ),
    } as TimelineItem;

    dlgEdit.showModal();
    */

    const item = {
        kind: args.kind,
        // isEditing: true,
        // prettier-ignore
        ...(
            args.kind === TimelineEntryKind.Place ? { city: "NEW CITY", } :
            args.kind === TimelineEntryKind.Transport ? { travelBy: TransportType.Walk, currency: "GBP", } :
            args.kind === TimelineEntryKind.Activity ? { activity: "What do you like to do?", } : 
            {}
        ),
    } as TimelineItem;
    editingItem.value = {
        index: args.index,
        item: item,
        list: timeline,
        isEditing: true,
        mode: EditMode.Add,
    };

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

<ul class="timeline timeline-vertical" bind:this={ulTimeline}>
    {#each timeline as item, i}
        <!--                                                    TODO: change here later, when add time property to ITimelineEntry -->
        <li class="timeline-item border" class:tracking-border={isCurrentTrackingItem(i, tracking.value)}>
            {#if i !== 0}<hr />{/if}
            <span class="timeline-handle mdi mdi-drag-vertical justify-self-start text-3xl"></span>

            <!-- <svelte:component this={displayComps[item.kind]} {item} /> -->

            {#if item.kind === TimelineEntryKind.Place}
                <ShowPlace {item} />
            {:else if item.kind === TimelineEntryKind.Transport}
                <ShowTransport {item} />
            {:else if item.kind === TimelineEntryKind.Activity}
                <ShowActivity {item} />
            {/if}

            <!-- TODO: 这个编辑和下面的添加按钮，能否做到列表之外，根据 hover 的 item 来显示 -->
            <button class="edit-btn-fix btn timeline-end btn-xs" hidden={dragging} onclick={() => EditItem(i, item)}>
                <span class="mdi mdi-pencil"></span>
            </button>

            <AddNewItem index={i} hidden={dragging} add={btnAddNewItem_Click} />

            {#if i !== timeline.length}<hr />{/if}
        </li>
    {/each}
</ul>
