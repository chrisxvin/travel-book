<script lang="ts">
import type { TimelineItem, } from "$lib/types";

import { DateTime } from "luxon";
import { TimelineEntryKind } from "$lib/types";
import ShowTimelineItem from "./show-timeline-item.svelte";
import { getTracking } from "./stores.svelte";
import { stringToTime } from "$lib/utils";

interface IProps {
    date: string;
    timeline: TimelineItem[];
}
let props: IProps = $props();

const dateObj = DateTime.fromFormat(props.date, "yyyy-MM-dd");
let tracking = getTracking();
let timeline = $state(props.timeline);

function isCurrentTrackingItem(index: number, isTracking: boolean): boolean {
    let item = timeline[index];
    if (isTracking && dateObj.isValid && item.kind === TimelineEntryKind.Transport) {
        const now = DateTime.now();
        let result = stringToTime(item.departAt) <= now && stringToTime(item.arriveAt) >= now;
        return result;
    } else {
        return false;
    }
}
</script>

<h2><span class="mdi mdi-calendar-today">&nbsp;{props.date}</span></h2>
<ul class="timeline timeline-vertical">
    {#each timeline as item, i}
        <!--                                                    TODO: change here later, when add time property to ITimelineEntry -->
        <li class="timeline-item border" class:tracking-border={isCurrentTrackingItem(i, tracking.value)}>
            {#if i !== 0 && item.kind !== TimelineEntryKind.Unknown}<hr class="bg-info-200" />{/if}
            <!-- <span class="timeline-handle mdi mdi-drag-vertical justify-self-start text-3xl"></span> -->

            <ShowTimelineItem {item} />

            {#if i !== timeline.length - 1 && item.kind !== TimelineEntryKind.Unknown}<hr class="bg-info-200" />{/if}
        </li>
    {/each}
</ul>
