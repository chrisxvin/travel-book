<script lang="ts">
import { TransportType, type ITransport, type ITransportViewModel } from "$lib/types";

import { TransportIcon } from "$lib/components";
import EditToggleButton from "./edit-toggle-button.svelte";

export let item: ITransportViewModel;

let editingItem: ITransportViewModel;

if (item.isEditing) editingItem = { ...item };

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
    item.isEditing = true;
}

</script>

<EditToggleButton on:prepare={btnEdit_Click} bind:isEditing={item.isEditing} />

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
    <p class="text-sm leading-8">{item.serviceId}{item.price ? ", " + format.format(item.price) : ""}</p>
    <p class="text-sm text-slate-400">{item.arriveTo ?? ""}</p>
</div>
