<script lang="ts">
import type { TimelineViewModel, TimelineItem, ITimelineEntry, IPlaceViewModel, ITransportViewModel, IActivityViewModel } from "$lib/types";
import type { AddNewItemEventArgs } from "./types";

import { TimelineEntryKind, TransportType } from "$lib/types";
import ShowPlace from "./show-place.svelte";
import ShowTransport from "./show-transport.svelte";
import ShowActivity from "./show-activity.svelte";
import AddNewItem from "./add-new-item.svelte";
import EditPlace from "./edit-place.svelte";
import EditTransport from "./edit-transport.svelte";
import EditActivity from "./edit-activity.svelte";
import EditToggleButton from "./edit-toggle-button.svelte";
import { EditMode } from "./types";

export let timeline: TimelineItem[];

let isEditing = false;
let editMode: EditMode = EditMode.None;
let editingItem: TimelineItem | undefined;
let editingIndex = -1;
let editingType: TimelineEntryKind = TimelineEntryKind.Unknown;
let dlgEdit: HTMLDialogElement;

function extract<T extends TimelineItem>(item: TimelineItem): T {
    return item as T;
}

const editComps: Record<TimelineEntryKind, ConstructorOfATypedSvelteComponent> = {
    [TimelineEntryKind.Unknown]: EditPlace,
    [TimelineEntryKind.Place]: EditPlace,
    [TimelineEntryKind.Transport]: EditTransport,
    [TimelineEntryKind.Activity]: EditActivity,
};

// function editItem(item: TimelineItem) {
//     item.isEditing = true;
//     timeline = timeline;
//     console.log("Edit", item);
// }

function btnEdit_Click() {}

function doAddNewItem(e: CustomEvent<AddNewItemEventArgs>) {
    log(e);
    editMode = EditMode.Add;
    editingIndex = e.detail.index;
    editingType = e.detail.kind;
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

    // timeline.splice(e.detail.index + 1, 0, newItem);
    // timeline = timeline;
    dlgEdit.showModal();
}

function btnEditSave_Click() {
    if (!editingItem) return;

    if (editMode === EditMode.Add) {
        timeline.splice(editingIndex + 1, 0, editingItem);
        timeline = timeline;
    } else if (editMode === EditMode.Edit) {
        //
    }

    dlgEdit.close();
}

function btnEditCancel_Click() {
    dlgEdit.close();
}
</script>

<ul class="timeline timeline-vertical">
    {#each timeline as item, i}
        <li class="timeline-item border">
            {#if i !== 0}<hr />{/if}

            <!-- <svelte:component this={displayComps[item.kind]} {item} /> -->

            {#if item.kind === TimelineEntryKind.Place}
                <ShowPlace {item} />
            {:else if item.kind === TimelineEntryKind.Transport}
                <ShowTransport {item} />
            {:else if item.kind === TimelineEntryKind.Activity}
                <ShowActivity {item} />
            {/if}

            <EditToggleButton on:prepare={btnEdit_Click} bind:isEditing />

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
<!-- 
<EditPlace item={extract<IPlaceViewModel>(editingItem)} />
<EditTransport item={extract<ITransportViewModel>(editingItem)} />
<EditActivity item={extract<IActivityViewModel>(editingItem)} />
-->

<!-- Open the modal using ID.showModal() method. can be closed using ID.close() method -->
<!-- <button class="btn" onclick="dlgEdit.showModal()">open modal</button> -->
<dialog id="dlgEdit" bind:this={dlgEdit} class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit</h3>

        {#if editingItem}
            <svelte:component this={editComps[editingType]} item={editingItem} />
        {/if}

        <div class="modal-action">
            <button class="btn" on:click={btnEditSave_Click}>Save</button>
            <button class="btn" on:click={btnEditCancel_Click}>Cancel</button>
        </div>
    </div>
</dialog>
