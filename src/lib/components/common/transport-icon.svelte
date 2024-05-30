<script lang="ts">
import { TransportType } from "$lib/types";

export let type: TransportType = TransportType.Other;
const map = {
    [TransportType.Driving]: "car",
    [TransportType.Taxi]: "taxi",
    [TransportType.Bus]: "bus",
    [TransportType.Metro]: "subway",
    [TransportType.Train]: "train",
    [TransportType.Plane]: "airplane",
    [TransportType.Ship]: "ferry",
    [TransportType.Walk]: "walk",
    [TransportType.Other]: "train-car",
};
</script>

<span class={`mdi mdi-${map[type] ?? map[TransportType.Other]}`}></span>
