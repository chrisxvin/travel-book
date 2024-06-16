<script lang="ts">
import { pascalCase } from "change-case";
import { TimelineEntryKind, type ITimelineEntry, type ITransport, type TimelineItem } from "$lib/types";
import { createEventDispatcher, tick } from "svelte";

export let index = 0;

const dispatch = createEventDispatcher();
let isOpen = false;

const items = [
    {
        type: TimelineEntryKind.Place,
        caption: pascalCase(TimelineEntryKind.Place),
        // component: EditPlace,
        onClick: () => {},
    },
    {
        type: TimelineEntryKind.Transport,
        caption: pascalCase(TimelineEntryKind.Transport),
        onClick: () => {},
    },
    {
        type: TimelineEntryKind.Activity,
        caption: pascalCase(TimelineEntryKind.Activity),
        onClick: () => {},
    },
];

function doAdd(type: TimelineEntryKind) {
    dispatch("add", type);
    isOpen = false;
    // TODO: 下次再打开菜单，会看到状态变化动画
}
</script>

<details class="add-btn-fix dropdown dropdown-end dropdown-top dropdown-hover" bind:open={isOpen}>
    <summary tabindex="0" class="btn btn-circle text-3xl">
        <span class="mdi mdi-plus"></span>
    </summary>
    <ul tabindex="0" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
        {#each items as item}
            <li><a class="dropdown-item" on:click={() => doAdd(item.type)}>{item.caption}</a></li>
        {/each}
    </ul>
</details>
