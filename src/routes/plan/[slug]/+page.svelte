<script lang="ts">
import type { PageData } from "./$types";

import City from "$lib/components/schedule/city.svelte";
import Transportation from "$lib/components/schedule/transportation.svelte";
import Activity from "$lib/components/schedule/activity.svelte";
import { ScheduleEntryKind } from "$lib/types";
import { showDate } from "$lib/utils";

export let data: PageData;
export const plan = data.plan;
</script>

<svelte:head>
    <title>Plan: {plan.title}</title>
</svelte:head>

<section>
    <h1>{plan.title}</h1>
    <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p>

    <div class="container">
        {#each plan.schedule as schItem}
            {#if schItem.kind === ScheduleEntryKind.City}
                <City city={schItem} />
            {/if}
            {#if schItem.kind === ScheduleEntryKind.Transportation}
                <Transportation tp={schItem} />
            {/if}
            {#if schItem.kind === ScheduleEntryKind.Activity}
                <Activity act={schItem} />
            {/if}
        {/each}
    </div>
</section>
