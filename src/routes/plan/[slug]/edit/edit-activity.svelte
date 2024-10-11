<script lang="ts">
import type { IActivity } from "$lib/types";

interface IProps {
    item: IActivity;
}
let { item }: IProps = $props();
</script>

<!-- 图标 -->
<div class="">
    <span class="mdi mdi-check-circle text-2xl text-info"></span>
    <span class="text-lg">Activity</span>
</div>

<textarea class="textarea textarea-bordered w-full bg-base-100" placeholder="Activity" bind:value={item.activity}></textarea>
