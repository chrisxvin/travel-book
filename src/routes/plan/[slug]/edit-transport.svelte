<script lang="ts">
import type { ITransport } from "$lib/types";

import { TransportIcon } from "$lib/components";
import { TransportType } from "$lib/types";
import { TransportIconMap } from "$lib/utils";
import config from "$lib/utils/config";

interface IProps {
    item: ITransport;
}
let { item }: IProps = $props();

const transTypes = Object.keys(TransportIconMap) as TransportType[];
</script>

<h4>Leave:</h4>
<div class="join w-full">
    <label class="input join-item input-bordered flex w-full items-center gap-2">
        <span class="mdi mdi-map-marker"></span>
        <input type="text" class="" placeholder="From" bind:value={item.leaveFrom} />
    </label>
    <label class="input join-item input-bordered flex items-center gap-2">
        <input type="time" class="" placeholder="At" bind:value={item.leaveAt} />
    </label>
</div>

<h4>Arrive:</h4>
<div class="join w-full">
    <label class="input join-item input-bordered flex w-full items-center gap-2">
        <span class="mdi mdi-map-marker"></span>
        <input type="text" class="" placeholder="To" bind:value={item.arriveTo} />
    </label>
    <label class="input join-item input-bordered flex items-center gap-2">
        <input type="time" class="" placeholder="At" bind:value={item.arriveAt} />
    </label>
</div>

<h4>Travel By:</h4>
<div class="join w-full">
    <select class="join-item select select-bordered max-w-xs" bind:value={item.travelBy}>
        {#each transTypes as type}
            <option value={type}>{type}</option>
        {/each}
    </select>
    <input type="text" class="input join-item input-bordered w-full" placeholder="Service Id" bind:value={item.serviceId} />
</div>

<h4>Price:</h4>
<div class="join w-full">
    <select class="join-item select select-bordered w-1/3" bind:value={item.currency}>
        {#each config.currencies as c}
            <option>{c}</option>
        {/each}
    </select>
    <input type="number" class="input join-item input-bordered w-2/3" placeholder="Price" bind:value={item.price} />
</div>
