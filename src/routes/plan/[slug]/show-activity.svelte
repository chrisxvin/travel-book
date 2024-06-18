<script lang="ts">
import type { IActivity } from "$lib/types";

export let item: IActivity;

</script>

<div class="timeline-middle">
    <span class="mdi mdi-check-circle"></span>
</div>

<div class="timeline-end">
    <span>Activity: {item.activity}</span>
</div>
