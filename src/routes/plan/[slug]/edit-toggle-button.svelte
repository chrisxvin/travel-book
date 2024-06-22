<script lang="ts">
interface IProps {
    isEditing: boolean;
    prepare: Action1<MouseEvent>;
}

let { isEditing = false, prepare }: IProps = $props();

function btnEdit_Click(e: MouseEvent) {
    prepare(e);
}
</script>

<div class="edit-btn-fix timeline-end">
    {#if isEditing}
        <!-- 取消按钮 -->
        <button class="btn btn-xs" onclick={() => (isEditing = false)}>
            <span class="mdi mdi-close"></span>
        </button>
    {:else}
        <!-- 编辑按钮 -->
        <button class="btn btn-xs" onclick={btnEdit_Click}>
            <span class="mdi mdi-pencil"></span>
        </button>
    {/if}
</div>
