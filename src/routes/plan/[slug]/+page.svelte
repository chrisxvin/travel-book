<script lang="ts" context="module">
import "./styles.less";
</script>

<script lang="ts">
import type { PageData } from "./$types";

// import { Card, Collapse } from "svelte-ux";
import { TimelineEntryKind, type TimelineItem } from "$lib/types";
import { showDate } from "$lib/utils";
import Day from "./day.svelte";
import EditPlace from "./edit-place.svelte";
import EditTransport from "./edit-transport.svelte";
import EditActivity from "./edit-activity.svelte";
import { getTracking, getEditingItem } from "./stores.svelte";
import { EditMode } from "./types";

let { data }: {
    data: PageData,
} = $props();
export const plan = data.plan;

let dlgEdit: HTMLDialogElement;
let tabIndex = $state(0);
let tracking = getTracking();
let editingItem = getEditingItem();
let editingKind: TimelineEntryKind = $state(TimelineEntryKind.Activity);

const editComps: Record<TimelineEntryKind, ConstructorOfATypedSvelteComponent> = {
    [TimelineEntryKind.Unknown]: EditPlace,
    [TimelineEntryKind.Place]: EditPlace,
    [TimelineEntryKind.Transport]: EditTransport,
    [TimelineEntryKind.Activity]: EditActivity,
};

$effect(() => {
    if (editingItem.value.isEditing && editingItem.value.item != null) {
        editingKind = editingItem.value.item?.kind;
        dlgEdit.showModal();
    } else {
        dlgEdit.close();
    }
});

function btnEditSave_Click() {
    editingItem.save();
}

function btnEditCancel_Click() {
    editingItem.close();
}
</script>

<svelte:head>
    <title>Plan: {plan.title}</title>
</svelte:head>

<section class="plan">
    <div class="flex flex-row justify-between">
        <h1>{plan.title}</h1>
        <!-- <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p> -->
        <span>&nbsp;</span>
        <label class="label cursor-pointer">
            <span class="label-text">Tracking&nbsp;</span>
            <input type="checkbox" class="toggle toggle-info" bind:checked={tracking.value} />
        </label>
    </div>

    <div role="tablist" class="tabs tabs-bordered">
        {#each plan.itinerary as { date }, i}
            <!-- svelte-ignore a11y-interactive-supports-focus -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-missing-attribute -->
            <a role="tab" class="tab" class:tab-active={tabIndex === i} onclick={e => (tabIndex = i)}>
                <span class="mdi mdi-calendar-today"></span>&nbsp;{date}
            </a>
        {/each}
    </div>

    <!-- 用 teleport 优化一下？减少循环次数。-->
    {#each plan.itinerary as { date, timeline }, i}
        {#if tabIndex === i}
            <Day {date} {timeline} />
        {/if}
    {/each}
</section>

<!-- Open the modal using ID.showModal() method. can be closed using ID.close() method -->
<!-- <button class="btn" onclick="dlgEdit.showModal()">open modal</button> -->
<dialog id="dlgEdit" bind:this={dlgEdit} class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit</h3>

        {#if editingItem.value.item}
            <svelte:component this={editComps[editingKind]} item={editingItem.value.item} />
        {/if}

        <div class="modal-action">
            <button class="btn" onclick={editingItem.save}>Save</button>
            <button class="btn" onclick={editingItem.close}>Cancel</button>
        </div>
    </div>
</dialog>
