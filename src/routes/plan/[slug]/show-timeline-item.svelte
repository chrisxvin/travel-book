<script lang="ts">
import type { Component } from "svelte";
import type { TimelineItem } from "$lib/types";

import { TimelineEntryKind } from "$lib/types";
import ShowPlace from "./show-place.svelte";
import ShowTransport from "./show-transport.svelte";
import ShowActivity from "./show-activity.svelte";

interface IProps {
    item: TimelineItem;
}
let { item }: IProps = $props();

const displayComps: Partial<Record<TimelineEntryKind, Component<any, any, any>>> = {
    [TimelineEntryKind.Place]: ShowPlace,
    [TimelineEntryKind.Transport]: ShowTransport,
    [TimelineEntryKind.Activity]: ShowActivity,
};
let ShowItem = $derived(displayComps[item.kind]);
</script>

<ShowItem {item} />
