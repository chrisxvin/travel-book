<script lang="ts">
import type { ITransport } from "$lib/types";

import { TransportIcon } from "$lib/components";

export let item: ITransport;

const format = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: item.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
</script>

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

<!--
<div class="container">
    <div class="row">
        <div class="col-1">{tp.leaveAt ?? ""}</div>
        <div class="col-1 waypoint-connector">
            <span class="start mdi mdi-circle-outline"></span>
        </div>
        <div class="col">{tp.leaveFrom}</div>
    </div>

    <div class="row">
        <div class="col-1 trans-icon"><TransportIcon type={tp.travelBy} /></div>
        <div class="col-1 waypoint-connector">
            <div class="middle">&nbsp;</div>
        </div>
        <div class="col">
            <div class="transport-content">
                {tp.serviceId}{tp.price ? ", " + format.format(tp.price ?? 0) : ""}
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-1">{tp.arriveAt ?? ""}</div>
        <div class="col-1 waypoint-connector">
            <span class="mdi mdi-record-circle-outline"></span>
        </div>
        <div class="col">{tp.arriveTo}</div>
    </div>
</div>
-->

<style lang="less" scoped>
.places {
    .from {
        margin-right: auto;
    }

    .to {
        margin-left: auto;
    }
}

.trans-icon {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 1.6em;
}

.waypoint-connector {
    display: flex;
    flex-direction: row;
    justify-content: center;

    .start {
        height: 100%;
    }

    .middle {
        height: 100%;
        background-color: deepskyblue;
    }

    .end {
        height: 100%;
    }
}

.transport-content {
    padding: 1em 0;
}
</style>
