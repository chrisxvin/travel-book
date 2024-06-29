<script lang="ts" context="module">
import "./styles.less";
</script>

<script lang="ts">
import type { PageData } from "./$types";

// import { Card, Collapse } from "svelte-ux";
import { TimelineEntryKind, type TimelineItem } from "$lib/types";
import { showDate } from "$lib/utils";
import AddNewItem from "./add-new-item.svelte";
import Day from "./day.svelte";
import { getTracking } from "./stores.svelte";

let { data }: {
    data: PageData,
} = $props();
export const plan = data.plan;

let showEditor = false;
let editingIndex = -1;
let editingEntry: TimelineItem | null = null;
let tabIndex = $state(0);
let tracking = getTracking();

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

    <!-- <div class="container">
        <button onclick={handleBtnAddClick}>Add</button>

        {#if showEditor}
            <ScheduleEntryEditor index={editingIndex} entry={editingEntry} />
        {/if}
    </div> -->
</section>
