<script lang="ts">
import type { IActivity } from "$lib/types";

interface IProps {
    item: IActivity;
}
let { item }: IProps = $props();
</script>

<div class="timeline-middle">
    <p><span class="mdi mdi-check-circle text-info text-2xl"></span></p>
</div>

<div class="timeline-end">
    <p>Activity: {item.activity}</p>
</div>
