<script lang="ts">
import type { TimelineItem, } from "$lib/types";

import { DateTime } from "luxon";
import Sortable from "sortablejs";
import { TransportType } from "$lib/types";
// import AddNewItem from "./add-new-item.svelte";
// import EditTimelineItem from "./edit-timeline-item.svelte";
import EditTransport from "./edit-transport.svelte";
import { getDragging, /* getEditingItem */ } from "./stores.svelte";

interface IProps {
    date: string;
    timeline: TimelineItem[];
}
let props: IProps = $props();

const dateObj = DateTime.fromFormat(props.date, "yyyy-MM-dd");
let ulTimeline: HTMLUListElement;
let sortable: Sortable;
let dragging = getDragging();
// let editingItem = getEditingItem();
let timeline = $state(props.timeline);

$effect(() => {
    sortable = Sortable.create(ulTimeline, {
        animation: 150,
        dragClass: "plan-editor-item-drag",
        ghostClass: "plan-editor-item-ghost",
        handle: ".plan-editor-item-handle",
        onStart: e => {
            dragging.value = true;
        },
        onEnd: e => {
            dragging.value = false;
        },
    });
});

function btnAddNewItem_Inplace_Click(index: number) {
    const newItem: TimelineItem = {
        // kind: TimelineEntryKind.Unknown,
        city: "A new place to stay",
        travelBy: TransportType.Walk,
    };

    timeline.splice(index + 1, 0, newItem);
}

function doAddItemCancel(index: number) {
    timeline.splice(index, 1);
}

function doDeleteItem(index: number) {
    if (confirm("Sure?")) {
        timeline.splice(index, 1);
    }
}

</script>

<h2><span class="mdi mdi-calendar-today">&nbsp;{props.date}</span></h2>
<ul class="plan-editor" bind:this={ulTimeline}>
    {#each timeline as item, i}
        <li class="plan-editor-item">
            <span class="plan-editor-item-handle mdi mdi-drag-vertical justify-self-start text-3xl"></span>

                <!-- <EditTransport {item} onEdit={() => editingItem.edit(i, item, timeline)} onDelete={() => doDeleteItem(i)} /> -->

                <!-- 编辑按钮，不出现在添加功能里。所以不能合并到 Day 组件上。 -->
                <!-- TODO: 这几个按钮，能否做到列表之外，根据 hover 的 item 来显示 -->
                <div class="edit-btn-fix">
                    <div class="join">
                        <!-- <button class="btn btn-error join-item btn-xs" hidden={dragging.value} onclick={onDelete}>
                            <span class="mdi mdi-delete-alert"></span>
                        </button> -->
                    </div>
                </div>

            <button class="add-btn-fix btn btn-circle text-3xl" onclick={() => btnAddNewItem_Inplace_Click(i)}>
                <span class="mdi mdi-plus"></span>
            </button>
            
        </li>
    {/each}
</ul>
