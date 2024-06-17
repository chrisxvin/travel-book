<script lang="ts">
import { TransportType, type ITransport, type ITransportViewModel } from "$lib/types";

import { TransportIcon } from "$lib/components";
import EditToggleButton from "./edit-toggle-button.svelte";
import config from "$lib/utils/config";

export let item: ITransport;

const format = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: item.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const transTypes = Object.keys(TransportType);

function btnSave_Click() {
    // console.log("Saving transport", item);
    // item = {
    //     ...item,
    // };
    // item.isEditing = false;
}
</script>

<!-- <EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={item.isEditing} /> -->

<div class="timeline-whole-row card w-full bg-base-100 shadow-md">
    <div class="card-body">
        <!-- <h2 class="card-title">Place</h2> -->

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
                    <option>{type}</option>
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

        <button class="btn w-24" on:click={btnSave_Click}><span class="mdi mdi-check"></span></button>
    </div>
</div>
