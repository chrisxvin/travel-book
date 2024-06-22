<script lang="ts">
import type { AddNewItemEventArgs } from "./types";

import { pascalCase } from "change-case";
import { TimelineEntryKind } from "$lib/types";

interface IProps {
    index: number;
    add: Action1<AddNewItemEventArgs>;
}
let { index = 0, add }: IProps = $props();

let isOpen = $state(false);

const items = [
    {
        type: TimelineEntryKind.Place,
        caption: pascalCase(TimelineEntryKind.Place),
    },
    {
        type: TimelineEntryKind.Transport,
        caption: pascalCase(TimelineEntryKind.Transport),
    },
    {
        type: TimelineEntryKind.Activity,
        caption: pascalCase(TimelineEntryKind.Activity),
    },
];

function doAdd(kind: TimelineEntryKind) {
    add({
        kind,
        index,
    });
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
            <li><a class="dropdown-item" onclick={() => doAdd(item.type)}>{item.caption}</a></li>
        {/each}
    </ul>
</details>
