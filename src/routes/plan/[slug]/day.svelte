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
import EditPlace from "./edit-place.svelte";
import EditTransport from "./edit-transport.svelte";
import EditActivity from "./edit-activity.svelte";
import { EditMode } from "./types";
import { tracking } from "./stores";
import { stringToTime } from "$lib/utils";

interface IProps {
    date: string;
    timeline: TimelineItem[];
}
let { date, timeline }: IProps = $props();

const dateObj = DateTime.fromFormat(date, "yyyy-MM-dd");
let editMode: EditMode = EditMode.None;
let editingItem: TimelineItem | undefined = $state();
let editingIndex = -1;
let editingType: TimelineEntryKind = $state(TimelineEntryKind.Unknown);
let dlgEdit: HTMLDialogElement;
let ulTimeline: HTMLUListElement;
let sortable: Sortable;
let dragging = $state(false);

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

const editComps: Record<TimelineEntryKind, ConstructorOfATypedSvelteComponent> = {
    [TimelineEntryKind.Unknown]: EditPlace,
    [TimelineEntryKind.Place]: EditPlace,
    [TimelineEntryKind.Transport]: EditTransport,
    [TimelineEntryKind.Activity]: EditActivity,
};

function EditItem(index: number, item: TimelineItem) {
    editingType = item.kind;
    editingIndex = index;
    editingItem = { ...item };
    editMode = EditMode.Edit;
    dlgEdit.showModal();
}

function btnAddNewItem_Click(args: AddNewItemEventArgs) {
    // log(args);
    editMode = EditMode.Add;
    editingIndex = args.index;
    editingType = args.kind;
    editingItem = {
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
}

function btnEditSave_Click() {
    if (!editingItem) return;

    if (editMode === EditMode.Add) {
        timeline.splice(editingIndex + 1, 0, editingItem);
    } else if (editMode === EditMode.Edit && editingIndex != -1) {
        timeline[editingIndex] = editingItem;
        editingItem = undefined;
    }

    timeline = timeline;
    editMode = EditMode.None;
    dlgEdit.close();
}

function btnEditCancel_Click() {
    dlgEdit.close();
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
        <li class="timeline-item border" class:tracking-border={isCurrentTrackingItem(i, $tracking)}>
            {#if i !== 0}<hr />{/if}
            <span class="timeline-handle mdi mdi-drag-vertical mx-3 justify-self-start text-3xl"></span>

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

<!-- Open the modal using ID.showModal() method. can be closed using ID.close() method -->
<!-- <button class="btn" onclick="dlgEdit.showModal()">open modal</button> -->
<dialog id="dlgEdit" bind:this={dlgEdit} class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit</h3>

        {#if editingItem}
            <svelte:component this={editComps[editingType]} item={editingItem} />
        {/if}

        <div class="modal-action">
            <button class="btn" onclick={btnEditSave_Click}>Save</button>
            <button class="btn" onclick={btnEditCancel_Click}>Cancel</button>
        </div>
    </div>
</dialog>
