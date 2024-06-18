<script lang="ts">
import { TransportType } from "$lib/types";
import { TransportIconMap } from "$lib/utils";
import {MDIcon} from "./";

export let type: TransportType = TransportType.Other;
</script>

<span class={`mdi mdi-${TransportIconMap[type]}`}>
    <slot />
</span>
<!-- <MDIcon icon={map[type] ?? map[TransportType.Other]} /> -->
