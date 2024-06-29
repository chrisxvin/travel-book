<script lang="ts">
import type { IPlace } from "$lib/types";

interface IProps {
    item: IPlace;
}
let { item }: IProps = $props();
</script>

<!-- 图标 -->
<div class="timeline-middle">
    <p><span class="mdi mdi-map-marker text-2xl"></span></p>
    <p>&nbsp;</p>
</div>

<!-- 城市和地点 -->
<div class="timeline-end">
    <p class="text-lg">{item.city}</p>
    <p class="text-lg">{item.place ?? ""}</p>
</div>
