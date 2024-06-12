<script lang="ts">
import type { IPlace } from "$lib/types";

export let item: IPlace;
</script>

<div class="bg-circle timeline-middle">
    <span class="mdi mdi-map-marker text-lg"></span>
</div>

<div class="timeline-end">
    <span class="text-lg">{item.city}{item.place == null ? "" : ", " + item.place}</span>
</div>
