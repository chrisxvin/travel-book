<script lang="ts">
import type { ITransport, ITransportViewModel } from "$lib/types";

import { TransportIcon } from "$lib/components";

export let item: ITransportViewModel;

const format = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: item.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
</script>

{#if item.isEditing}
    <p>is editing</p>
{:else}
    <hr />
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
    <hr />
{/if}

<style lang="less" scoped>
.transport-content {
    padding: 1em 0;
}
</style>
