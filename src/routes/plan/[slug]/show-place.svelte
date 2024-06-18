<script lang="ts">
import type { IPlace } from "$lib/types";

export let item: IPlace;

</script>

<!-- 图标 -->
<div class="timeline-middle">
    <p>
        <span class="mdi mdi-map-marker text-lg"></span>
    </p>
</div>

<!-- 城市和地点 -->
<div class="timeline-end">
    <p class="text-lg">{item.city}{item.place == null ? "" : ", " + item.place}</p>
</div>
