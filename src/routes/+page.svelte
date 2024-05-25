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
        <h1><a href={`/plan/${plan.id}`}>{plan.title}</a></h1>
        <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p>
    {/each}
</section>
