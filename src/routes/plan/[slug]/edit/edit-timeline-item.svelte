<script lang="ts">
import type { Component } from "svelte";
import type { TimelineItem } from "$lib/types";

import { TimelineEntryKind } from "$lib/types";
import EditPlace from "./edit-place.svelte";
import EditTransport from "./edit-transport.svelte";
import EditActivity from "./edit-activity.svelte";
import { getDragging, getEditingItem } from "./stores.svelte";

let editingItem = getEditingItem();
let dragging = getDragging();

interface IProps {
    item: TimelineItem;
    onEdit: Action;
    onDelete: Action;
}
let { item, onEdit, onDelete }: IProps = $props();

const editComps: Partial<Record<TimelineEntryKind, Component<any, any, any>>> = {
    [TimelineEntryKind.Place]: EditPlace,
    [TimelineEntryKind.Transport]: EditTransport,
    [TimelineEntryKind.Activity]: EditActivity,
};

let Editor = $derived(editComps[item.kind]);

//todo: debounce save ,call onEdit()
</script>

<div class="w-full plan-editor-layout">
    <Editor {item} />
</div>

<!-- 编辑按钮，不出现在添加功能里。所以不能合并到 Day 组件上。 -->
<!-- TODO: 这几个按钮，能否做到列表之外，根据 hover 的 item 来显示 -->
<div class="edit-btn-fix">
    <div class="join">
        <button class="btn btn-error join-item btn-xs" hidden={dragging.value} onclick={onDelete}>
            <span class="mdi mdi-delete-alert"></span>
        </button>
    </div>
</div>
