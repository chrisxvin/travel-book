<script lang="ts">
import type { ITransport } from "$lib/types";

import { showTime } from "$lib/utils";

export let tp: ITransport;
</script>

<div class="card mb-1">
    <div class="card-header d-flex flex-row flex-wrap justify-content-between">
        <span class="">{tp.leaveFrom}</span>
        <span class="">--&gt;</span>
        <span class="">{tp.arriveTo}</span>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item clearfix">
            <span class="float-start">{tp.leaveAt != null && showTime(tp.leaveAt)}</span>
            <span class="float-end">{tp.arriveAt != null && showTime(tp.arriveAt)}</span>
        </li>
        <li class="list-group-item clearfix">
            <span class="float-start">{tp.serviceId}</span>
            <span class="float-end"><span class="badge text-bg-primary">{tp.currency}</span>&nbsp;{tp.price}</span>
        </li>
        <li class="list-group-item clearfix">
            <span class="float-start">L</span>
            <span class="float-end">R</span>
        </li>
    </ul>
</div>
