<script lang="ts">
import AGGridSvelte from "ag-grid-svelte";
import type { ColDef, ColGroupDef } from "ag-grid-community";
import type { PageData } from "./$types";
import type { ISchedule, IWhenWhere } from "$lib/models";

export let data: PageData;
export const plans = data.plans;

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
        <p>{plan.title}</p>
        <p>{plan.date}</p>
        <p>{plan.schedule}</p>
    {/each}
    <div class="ag-theme-alpine my-grid">
        <AGGridSvelte {columnDefs} rowData={plans[0].schedule} />
    </div>
</section>

<style>
.my-grid {
    width: 100%;
    height: 400px;
}
</style>
