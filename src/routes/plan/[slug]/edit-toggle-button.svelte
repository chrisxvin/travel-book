<script lang="ts">
import { createEventDispatcher } from "svelte";

export let isEditing = false;

const dispatch = createEventDispatcher();

function btnEdit_Click(e: MouseEvent) {
    dispatch("prepare", e);
}
</script>

<div class="edit-btn-fix timeline-end">
    {#if isEditing}
        <!-- 取消按钮 -->
        <button class="btn btn-xs" on:click={() => (isEditing = false)}>
            <span class="mdi mdi-close"></span>
        </button>
    {:else}
        <!-- 编辑按钮 -->
        <button class="btn btn-xs" on:click={btnEdit_Click}>
            <span class="mdi mdi-pencil"></span>
        </button>
    {/if}
</div>
