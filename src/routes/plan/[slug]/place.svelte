<script lang="ts">
import type { IPlaceViewModel } from "$lib/types";

import { TransportIcon } from "$lib/components";
import { Timeline } from "$lib/components/daisy-ui";
import { TimelineEntryKind } from "$lib/types";
import Activity from "./activity.svelte";
import Transport from "./transport.svelte";

export let place: IPlaceViewModel;
</script>

{#if place.items == null || place.items.length == 0}
    <span>No items.</span>
{:else}

<Timeline items={place.items} vertical={true}>
    <svelte:fragment slot="start" let:item>
        <span>{item.leaveAt}</span>
    </svelte:fragment>

    <svelte:fragment slot="end" let:item>
        <TransportIcon type={item.travelBy} />
        <div>{item.serviceId}</div>
        <p>{item.price}</p>
        <p>{item.arriveTo}</p>
    </svelte:fragment>
</Timeline>

    <!-- {#each place.items as item}
        {#if item.kind === TimelineEntryKind.Transport}
            <Transport tp={item} />
        {/if}
        {#if item.kind === TimelineEntryKind.Activity}
            <Activity act={item} />
        {/if}
    {/each} -->
{/if}
