<script lang="ts">
import type { IActivity } from "$lib/types";

export let item: IActivity;
</script>

&nbsp;
<textarea class="textarea textarea-bordered w-full bg-base-100" placeholder="Activity" bind:value={item.activity}></textarea>
