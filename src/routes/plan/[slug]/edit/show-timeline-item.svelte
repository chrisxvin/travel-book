<script lang="ts">
import type { Component } from "svelte";
import type { TimelineItem } from "$lib/types";

import { TimelineEntryKind, TransportType } from "$lib/types";
import AddItemInPlace from "./add-item-in-place.svelte";
import EditPlace from "./edit-place.svelte";
import EditTransport from "./edit-transport.svelte";
import EditActivity from "./edit-activity.svelte";
// import ShowPlace from "./show-place.svelte";
// import ShowTransport from "./show-transport.svelte";
// import ShowActivity from "./show-activity.svelte";
import { getDragging, getEditingItem } from "./stores.svelte";

let editingItem = getEditingItem();
let dragging = getDragging();

interface IProps {
    item: TimelineItem;
    onAdd: Action;
    onEdit: Action;
    onDelete: Action;
}
let { item, onAdd, onEdit, onDelete }: IProps = $props();

const editComps: Record<TimelineEntryKind, Component<any, any, any>> = {
    [TimelineEntryKind.Unknown]: AddItemInPlace,
    [TimelineEntryKind.Place]: EditPlace,
    [TimelineEntryKind.Transport]: EditTransport,
    [TimelineEntryKind.Activity]: EditActivity,
};

let Editor = $derived(editComps[item.kind]);

</script>

<Editor {item} />

<!-- TODO: 这几个按钮，能否做到列表之外，根据 hover 的 item 来显示 -->
<div class="edit-btn-fix timeline-end">
    <div class="join">
        <button class="btn join-item btn-xs" hidden={dragging.value} onclick={onEdit}>
            <span class="mdi mdi-pencil"></span>
        </button>
        <button class="btn btn-error join-item btn-xs" hidden={dragging.value} onclick={onDelete}>
            <span class="mdi mdi-delete-alert"></span>
        </button>
    </div>
</div>

<button class="add-btn-fix btn btn-circle text-3xl" onclick={onAdd}>
    <span class="mdi mdi-plus"></span>
</button>
