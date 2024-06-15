<script lang="ts">
import { pascalCase } from "change-case";
import { TimelineEntryKind, type ITimelineEntry, type ITransport, type TimelineItem } from "$lib/types";
import EditPlace from "./edit-place.svelte";
import type { SvelteComponent } from "svelte";

const items = [
    {
        type: TimelineEntryKind.Place,
        caption: pascalCase(TimelineEntryKind.Place),
        component: EditPlace,
        onClick: () => {
            
        },
    },
    {
        type: TimelineEntryKind.Transport,
        caption: pascalCase(TimelineEntryKind.Transport),
        onClick: () => {
            
        },
    },
    {
        type: TimelineEntryKind.Activity,
        caption: pascalCase(TimelineEntryKind.Activity),
        onClick: () => {
            
        },
    },
];

let selectedComponent: ConstructorOfATypedSvelteComponent | undefined;

</script>

<div class="dropdown dropdown-end dropdown-top dropdown-hover fixed bottom-10 right-10">
    <div tabindex="0" role="button" class="btn btn-circle m-1">Add</div>
    <ul tabindex="0" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
        {#each items as item}
            <li><a class="dropdown-item" on:click={() => selectedComponent = item.component}>{item.caption}</a></li>
        {/each}
    </ul>
</div>

<div class="card">
<svelte:component this={selectedComponent} />
</div>
