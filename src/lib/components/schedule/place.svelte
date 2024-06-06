<script lang="ts">
import type { IPlaceViewModel } from "$lib/types";

import { TimelineEntryKind } from "$lib/types";
import { Activity, Transport } from ".";

export let place: IPlaceViewModel;
</script>

{#if place.items == null || place.items.length == 0}
    <span>No items.</span>
{:else}
    {#each place.items as item}
        {#if item.kind === TimelineEntryKind.Transport}
            <Transport tp={item} />
        {/if}
        {#if item.kind === TimelineEntryKind.Activity}
            <Activity act={item} />
        {/if}
    {/each}
{/if}
