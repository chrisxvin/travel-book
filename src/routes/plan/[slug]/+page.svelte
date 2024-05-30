<script lang="ts">
import type { PageData } from "./$types";

import { ScheduleEntryKind, type ScheduleItem } from "$lib/types";
import { showDate } from "$lib/utils";
import { Day, ScheduleEntryEditor } from "$lib/components/schedule";

export let data: PageData;
export const plan = data.plan;

let itineraryItems = Object.entries(plan.itinerary);
let showEditor = false;
let editingIndex = -1;
let editingEntry: ScheduleItem | null = null;

function handleBtnAddClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    editingEntry = {
        kind: ScheduleEntryKind.Unknown,
    } as ScheduleItem;

    showEditor = true;
}
</script>

<svelte:head>
    <title>Plan: {plan.title}</title>
</svelte:head>

<section>
    <h1>{plan.title}</h1>
    <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p>

    {#each itineraryItems as [date, schedule]}
    <Day {date} {schedule} />
    {/each}

    <div class="container">
        <button on:click={handleBtnAddClick}>Add</button>

        {#if showEditor}
            <ScheduleEntryEditor index={editingIndex} entry={editingEntry} />
        {/if}
    </div>
</section>
