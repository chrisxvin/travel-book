<script lang="ts">
import { TransportType, type ITransport, type ITransportViewModel } from "$lib/types";

import { TransportIcon } from "$lib/components";
import EditToggleButton from "./edit-toggle-button.svelte";
import config from "$lib/utils/config";

export let item: ITransport;

let editingItem: ITransport;
let isEditing = false;

const format = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: item.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const transTypes = Object.keys(TransportType);

function btnEdit_Click() {
    editingItem = {
        ...item,
    };
    isEditing = true;
}

function btnSave_Click() {
    console.log("Saving place", editingItem);
    item = {
        ...editingItem,
    };
    isEditing = false;
}
</script>

<EditToggleButton on:prepare={btnEdit_Click} bind:isEditing />

{#if isEditing}
    <div class="timeline-whole-row card w-full bg-base-100 shadow-md">
        <div class="card-body">
            <!-- <h2 class="card-title">Place</h2> -->

            Leave:
            <div class="join">
                <label class="input join-item input-bordered flex items-center gap-2">
                    <span class="mdi mdi-map-marker"></span>
                    <input type="text" class="grow" placeholder="From" bind:value={editingItem.leaveFrom} />
                </label>
                <label class="input join-item input-bordered flex items-center gap-2">
                    <input type="time" class="grow" placeholder="At" bind:value={editingItem.leaveAt} />
                </label>
            </div>

            Arrive:
            <div class="join">
                <label class="input join-item input-bordered flex items-center gap-2">
                    <span class="mdi mdi-map-marker"></span>
                    <input type="text" class="grow" placeholder="To" bind:value={editingItem.arriveTo} />
                </label>
                <label class="input join-item input-bordered flex items-center gap-2">
                    <input type="time" class="grow" placeholder="At" bind:value={editingItem.arriveAt} />
                </label>
            </div>

            Travel By:
            <div class="join">
                <select class="join-item select select-bordered max-w-xs" bind:value={editingItem.travelBy}>
                    {#each transTypes as type}
                        <option>{type}</option>
                    {/each}
                </select>

                <label class="input join-item input-bordered flex items-center gap-2">
                    <input type="text" class="grow" placeholder="Service Id" bind:value={editingItem.serviceId} />
                </label>
            </div>

            Price:
            <div class="join">
                <select class="join-item select select-bordered max-w-xs" bind:value={editingItem.currency}>
                    {#each config.currencies as c}
                        <option>{c}</option>
                    {/each}
                </select>

                <label class="input join-item input-bordered flex items-center gap-2">
                    <input type="number" class="grow" placeholder="Price" bind:value={editingItem.price} />
                </label>
            </div>

            <button class="btn w-24" on:click={btnSave_Click}><span class="mdi mdi-check"></span></button>
        </div>
    </div>
{/if}

<div class="timeline-start text-right">
    <!-- todo: 给 ITimelineEntry 加上时间属性，代替 leaveAt -->
    <p class="">{item.leaveAt ?? ""}</p>
    <p class="text-sm leading-8">&nbsp;</p>
    <p class="text-sm text-slate-300">{item.arriveAt ?? ""}</p>
</div>

<div class="timeline-middle">
    <div>
        <TransportIcon type={item.travelBy} />
    </div>
</div>

<div class="timeline-end">
    <p class="">{item.leaveFrom}</p>
    <p class="text-sm leading-8">{item.serviceId}{item.price ? ", " + format.format(item.price ?? 0) : ""}</p>
    <p class="text-sm text-slate-400">{item.arriveTo ?? ""}</p>
</div>
