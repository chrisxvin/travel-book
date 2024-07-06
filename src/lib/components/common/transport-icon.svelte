<script lang="ts">
import { TransportType } from "$lib/types";
import { TransportIconMap } from "$lib/utils";

interface IProps {
    className?: string;
    type: TransportType;
    children?: any;
}
let { className, type = TransportType.Other, children }: IProps = $props();
</script>

<span class={`mdi mdi-${TransportIconMap[type]} ${className}`}>
    <!-- <slot /> -->
    {@render children?.()}
</span>
