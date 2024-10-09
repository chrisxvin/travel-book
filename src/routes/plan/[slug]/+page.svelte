<script lang="ts" module>
import "./styles.less";
</script>

<script lang="ts">
import type { Component } from "svelte";
import type { PageData } from "./$types";

import { enhance } from '$app/forms';
import { TimelineEntryKind } from "$lib/types";
import Day from "./day.svelte";
import AddItemInPlace from "./add-item-in-place.svelte";
import EditPlace from "./edit-place.svelte";
import EditTransport from "./edit-transport.svelte";
import EditActivity from "./edit-activity.svelte";
import { getTracking, getEditingItem } from "./stores.svelte";

let {
    data,
}: {
    data: PageData;
} = $props();
export const plan = data.plan;
const jsonData = $derived(JSON.stringify(data.plan));

let dlgEdit: HTMLDialogElement;
let tabIndex = $state(0);
let tracking = getTracking();
let editingItem = getEditingItem();
let editingKind: TimelineEntryKind = $state(TimelineEntryKind.Activity);

const editComps: Record<TimelineEntryKind, Component<any, any, any>> = {
    [TimelineEntryKind.Unknown]: AddItemInPlace,
    [TimelineEntryKind.Place]: EditPlace,
    [TimelineEntryKind.Transport]: EditTransport,
    [TimelineEntryKind.Activity]: EditActivity,
};

let Editor = $derived(editComps[editingKind]);

$effect(() => {
    if (editingItem.value.isEditing && editingItem.value.item != null) {
        editingKind = editingItem.value.item?.kind;
        dlgEdit.showModal();
    } else {
        dlgEdit.close();
    }
});

function btnSave_Click() {
    fetch("?/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
    });
}

function btnRevert_Click(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (confirm("Discard all editings?")) {
        window.location.reload();
    }
}

</script>

<svelte:head>
    <title>Plan: {plan.title}</title>
</svelte:head>

<!-- edit toolbar -->
<form method="POST" action="?/save" use:enhance>
    <section class="join">
        <button class="btn btn-success join-item">Save</button>
        <button class="btn join-item" onclick={btnRevert_Click}>Revert</button>
    </section>
    <input type="hidden" name="plan" value={jsonData} />
</form>
<section class="plan">
    <div class="flex flex-row justify-between">
        <h1>{plan.title}</h1>
        <!-- <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p> -->
        <span>&nbsp;</span>
        <label class="label cursor-pointer">
            <span class="label-text">Tracking&nbsp;</span>
            <input type="checkbox" class="toggle toggle-primary" bind:checked={tracking.value} />
        </label>
    </div>

    {#each plan.itinerary as { date, timeline }, i}
        <Day {date} {timeline} />
    {/each}
</section>

<!-- Open the modal using ID.showModal() method. can be closed using ID.close() method -->
<!-- <button class="btn" onclick="dlgEdit.showModal()">open modal</button> -->
<dialog id="dlgEdit" bind:this={dlgEdit} class="modal">
    <div class="modal-box">
        <h3 class="text-lg font-bold">Edit</h3>

        {#if editingItem.value.item}
            <Editor item={editingItem.value.item} />
        {/if}

        <div class="modal-action">
            <button class="btn btn-primary" onclick={editingItem.save}>Save</button>
            <button class="btn" onclick={editingItem.close}>Cancel</button>
        </div>
    </div>
</dialog>
