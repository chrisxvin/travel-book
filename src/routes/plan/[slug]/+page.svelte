<script lang="ts">
import type { PageData } from "./$types";

// import { Card, Collapse } from "svelte-ux";
import { TimelineEntryKind, type TimelineItem } from "$lib/types";
import { showDate } from "$lib/utils";
import { ScheduleEntryEditor } from "$lib/components";
import { Tabs } from "$lib/components/daisy-ui";
import Day from "./day.svelte";

export let data: PageData;
export const plan = data.plan;

let showEditor = false;
let editingIndex = -1;
let editingEntry: TimelineItem | null = null;
let tabIndex = 0;

function handleBtnAddClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    editingEntry = {
        kind: TimelineEntryKind.Unknown,
    } as TimelineItem;

    showEditor = true;
}
</script>

<svelte:head>
    <title>Plan: {plan.title}</title>
</svelte:head>

<section>
    <h1>{plan.title}</h1>
    <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p>

    <Tabs tabs={plan.itinerary}>
        <svelte:fragment slot="header" let:item={{date}}>
            <span class="mdi mdi-calendar-today">&nbsp;{date}</span>
        </svelte:fragment>

        <svelte:fragment let:item={{date, places}}>
            <Day {date} {places} />
        </svelte:fragment>
    </Tabs>

    <div class="container">
        <button on:click={handleBtnAddClick}>Add</button>

        {#if showEditor}
            <ScheduleEntryEditor index={editingIndex} entry={editingEntry} />
        {/if}
    </div>
</section>
