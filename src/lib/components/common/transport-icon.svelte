<script lang="ts">
import { TransportType } from "$lib/types";
import { TransportIconMap } from "$lib/utils";

interface IProps {
    type: TransportType;
    children?: any;
}
let { type = TransportType.Other, children }: IProps = $props();
</script>

<span class={`mdi mdi-${TransportIconMap[type]} text-2xl`}>
    <!-- <slot /> -->
    {@render children?.()}
</span>
