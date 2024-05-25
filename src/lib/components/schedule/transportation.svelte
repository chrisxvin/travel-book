<script lang="ts">
import type { ITransportation } from "$lib/types";

import {showTime} from "$lib/utils";

export let tp: ITransportation;
</script>

<div class="card mb-1">
    <div class="card-header clearfix" style="text-align: center;">
        <span class="float-start">{tp.leaveFrom}</span>
        --&gt;
        <span class="float-end">{tp.arriveTo}</span>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item clearfix">
            <span class="float-start">{tp.leaveAt != null && showTime(tp.leaveAt)}</span>
            <span class="float-end">{tp.arriveAt != null && showTime(tp.arriveAt)}</span>
        </li>
        <li class="list-group-item clearfix">
            <span class="float-start">{tp.code}</span>
            <span class="float-end"><span class="badge text-bg-primary">{tp.currency}</span>&nbsp;{tp.price}</span>
        </li>
        <li class="list-group-item clearfix">
            <span class="float-start">L</span>
            <span class="float-end">R</span>
        </li>
    </ul>
</div>
