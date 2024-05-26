<script lang="ts">
import type { PageData } from "./$types";

import { ScheduleEntryKind, type ScheduleItem } from "$lib/types";
import { showDate } from "$lib/utils";
import City from "$lib/components/schedule/city.svelte";
import Transport from "$lib/components/schedule/transport.svelte";
import Activity from "$lib/components/schedule/activity.svelte";
import ScheduleEntryEditor from "$lib/components/schedule/schedule-entry-editor.svelte";

export let data: PageData;
export const plan = data.plan;

let showEditor = false;
let editingIndex = -1;
let editingEntry: ScheduleItem | null = null;

function handleBtnAddClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
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

    <div>
        {#each plan.schedule as schItem}
            {#if schItem.kind === ScheduleEntryKind.City}
                <City city={schItem} />
            {/if}
            {#if schItem.kind === ScheduleEntryKind.Transport}
                <Transport tp={schItem} />
            {/if}
            {#if schItem.kind === ScheduleEntryKind.Activity}
                <Activity act={schItem} />
            {/if}
        {/each}
    </div>

    <div class="container">
        <button on:click={handleBtnAddClick}>Add</button>

        {#if showEditor}
        <ScheduleEntryEditor index={editingIndex} entry={editingEntry}/>
        {/if}
    </div>
</section>
