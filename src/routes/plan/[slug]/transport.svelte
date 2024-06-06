<script lang="ts">
import type { ITransport } from "$lib/types";

import { TransportIcon } from "$lib/components";

export let tp: ITransport;

const format = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: tp.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
</script>

<div class="container">
    <div class="row">
        <div class="col-1">{tp.leaveAt ?? ""}</div>
        <div class="col-1 waypoint-connector">
            <span class="mdi mdi-circle-outline"></span>
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

<!--
<div class="card mb-1">
    <div class="card-header d-flex flex-row flex-wrap justify-content-between places">
        <span class="from">{tp.leaveFrom}</span>
        <span class="arror">--&gt;</span>
        <span class="to">{tp.arriveTo}</span>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item clearfix">
            <span class="float-start">{tp.leaveAt != null && showTime(tp.leaveAt)}</span>
            <span class="float-end">{tp.arriveAt != null && showTime(tp.arriveAt)}</span>
        </li>
        <li class="list-group-item clearfix">
            <span class="float-start"><TransportIcon type={tp.travelBy} /> {tp.serviceId}</span>
            <span class="float-end">{format.format(tp.price ?? 0)}</span>
        </li>
    </ul>
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
    font-size: 1.6em;
}

.waypoint-connector {
    .start {
        height: 100%;
        border-right: 5px solid deepskyblue;
        margin-right: 10px;
    }

    .middle {
        height: 100%;
        border-right: 5px solid deepskyblue;
        margin-right: 10px;
    }

    .end {
        height: 100%;
        border-right: 5px solid deepskyblue;
        margin-right: 10px;
    }
}

.transport-content {
    padding: 1em 0;
}
</style>
