<script lang="ts">
import { ScheduleEntryKind, type ScheduleItem } from "$lib/types";
import { Activity, Place, Transport } from ".";

export let date: string;
export let schedule: ScheduleItem[];
</script>

<h2>{date}</h2>
<div>
    {#each schedule as item}
        {#if item.kind === ScheduleEntryKind.Place}
            <Place place={item} />
        {/if}
        {#if item.kind === ScheduleEntryKind.Transport}
            <Transport tp={item} />
        {/if}
        {#if item.kind === ScheduleEntryKind.Activity}
            <Activity act={item} />
        {/if}
    {/each}
</div>
