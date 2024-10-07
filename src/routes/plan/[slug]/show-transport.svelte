<script lang="ts">
import type { ITransport } from "$lib/types";

import { TransportIcon } from "$lib/components";
import { getPriceFormat } from "./utils";

interface IProps {
    item: ITransport;
}
let { item }: IProps = $props();

const format = getPriceFormat(item.currency);
</script>

<div class="timeline-start text-right">
    <!-- todo: 给 ITimelineEntry 加上时间属性，代替 leaveAt -->
    <p class="">{item.leaveAt ?? ""}</p>
    <p class="text-sm leading-8">&nbsp;</p>
    <p class="text-sm text-slate-300">{item.arriveAt ?? ""}</p>
</div>

<div class="timeline-middle">
    <p><TransportIcon className="text-info text-2xl" type={item.travelBy} /></p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
</div>

<div class="timeline-end">
    <p class="">{item.leaveFrom}</p>
    <p class="text-sm leading-8">{item.serviceId}{item.price ? ", " + format.format(item.price) : ""}</p>
    <p class="text-sm text-slate-400">{item.arriveTo ?? ""}</p>
</div>
