<script lang="ts">
import type { ITransport } from "$lib/types";

import { TransportIcon } from "$lib/components";
import { TransportType } from "$lib/types";
import { TransportIconMap } from "$lib/utils";
import config from "$lib/utils/config";

export let item: ITransport;

const transTypes = Object.keys(TransportIconMap) as TransportType[];
log(transTypes)
</script>

Leave:
<div class="join">
    <label class="input join-item input-bordered flex items-center gap-2">
        <span class="mdi mdi-map-marker"></span>
        <input type="text" class="grow" placeholder="From" bind:value={item.leaveFrom} />
    </label>
    <label class="input join-item input-bordered flex items-center gap-2">
        <input type="time" class="grow" placeholder="At" bind:value={item.leaveAt} />
    </label>
</div>

Arrive:
<div class="join">
    <label class="input join-item input-bordered flex items-center gap-2">
        <span class="mdi mdi-map-marker"></span>
        <input type="text" class="grow" placeholder="To" bind:value={item.arriveTo} />
    </label>
    <label class="input join-item input-bordered flex items-center gap-2">
        <input type="time" class="grow" placeholder="At" bind:value={item.arriveAt} />
    </label>
</div>

Travel By:
<div class="join">
    <select class="join-item select select-bordered max-w-xs" bind:value={item.travelBy}>
        {#each transTypes as type}
            <option value={type}><TransportIcon {type}>&nbsp;{type}</TransportIcon></option>
        {/each}
    </select>

    <label class="input join-item input-bordered flex items-center gap-2">
        <input type="text" class="grow" placeholder="Service Id" bind:value={item.serviceId} />
    </label>
</div>

Price:
<div class="join">
    <select class="join-item select select-bordered max-w-xs" bind:value={item.currency}>
        {#each config.currencies as c}
            <option>{c}</option>
        {/each}
    </select>

    <label class="input join-item input-bordered flex items-center gap-2">
        <input type="number" class="grow" placeholder="Price" bind:value={item.price} />
    </label>
</div>
