<script lang="ts">
import type { ColDef, ColGroupDef } from "ag-grid-community";
import type { PageData } from "./$types";

import AGGridSvelte from "ag-grid-svelte";
import City from "$lib/components/schedule/city.svelte";
import Transportation from "$lib/components/schedule/transportation.svelte";
import { ScheduleEntryKind } from "$lib/types";
import { showDate } from "$lib/utils";

export let data: PageData;
export const plans = data.plans;
console.log(data);

function createWhenWhereColumnDefs(mainField: string): ColDef[] {
    return [
        { field: mainField + ".when", headerName: "When", cellDataType: "date" },
        { field: mainField + ".city", headerName: "City" },
        { field: mainField + ".place", headerName: "Place" },
    ];
}

const columnDefs: ColGroupDef[] = [
    {
        headerName: "Departure",
        children: createWhenWhereColumnDefs("departure"),
    },
    {
        headerName: "Transportation",
        children: [
            { field: "transportation.type", headerName: "Type" },
            { field: "transportation.code", headerName: "Code" },
        ],
    },
    {
        headerName: "Arrival",
        children: createWhenWhereColumnDefs("arrival"),
    },
];
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    {#each plans as plan}
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
            {/each}
        </div>
    {/each}
</section>

<style>
.my-grid {
    width: 100%;
    height: 400px;
}
</style>
