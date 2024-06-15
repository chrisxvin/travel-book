<script lang="ts">
import type { ITransport, ITransportViewModel } from "$lib/types";

import { TransportIcon } from "$lib/components";
import EditToggleButton from "./edit-toggle-button.svelte";

export let item: ITransport;

let editingItem: ITransport;
let isEditing = false;

const format = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: item.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

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

{#if !isEditing}
    <hr />
{/if}

<EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={isEditing}   />

{#if isEditing}
<div class="timeline-whole-row card w-full bg-base-100 shadow-md">
    <!-- <figure><img src="/images/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_%28cropped%29.jpg" alt="Place" /></figure> -->
    <div class="card-body">
        <!-- <h2 class="card-title">Place</h2> -->

        <div class="join">
            <input class="input input-bordered join-item" placeholder="Search"/>
            <!-- <input type="text" class="grow" placeholder="Search" /> -->

            <button class="btn join-item" on:click={btnSave_Click}><span class="mdi mdi-check"></span></button>
        </div>
    </div>
</div>
{:else}
    <div class="timeline-start">
        <!-- todo: 给 ITimelineEntry 加上时间属性，代替 leaveAt -->
        <span>{item.leaveAt ?? ""}</span>
    </div>

    <div class="bg-circle timeline-middle">
        <TransportIcon type={item.travelBy} />
    </div>

    <div class="timeline-end">
        <div>
            <span>{item.leaveFrom}</span>
            <div class="transport-content">
                {item.serviceId}{item.price ? ", " + format.format(item.price ?? 0) : ""}
            </div>
        </div>
    </div>
{/if}

{#if !isEditing}
    <hr />
{/if}

<style lang="less" scoped>
.transport-content {
    padding: 1em 0;
}
</style>
