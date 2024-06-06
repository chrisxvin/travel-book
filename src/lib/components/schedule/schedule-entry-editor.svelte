<script lang="ts">
import { TimelineEntryKind, type ITimelineEntry, type ITransport, type TimelineItem } from "$lib/types";
import TransportEditor from "./transport-editor.svelte";

export let index: number;
export let entry: ITimelineEntry | null;

let editKind = TimelineEntryKind.Unknown;

function showEditor(kind: TimelineEntryKind): void {
    entry = {
        kind,
    } as ITimelineEntry;
    editKind = kind;
}
</script>

<div style="height: 200px">
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Kind</button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item">Place</a></li>
            <li><a class="dropdown-item" on:click={e => showEditor(TimelineEntryKind.Transport)}>Transport</a></li>
            <li><a class="dropdown-item">Activity</a></li>
        </ul>
    </div>

    {#if editKind == TimelineEntryKind.Place}
        <div>Not available</div>
    {:else if editKind == TimelineEntryKind.Transport}
        <TransportEditor {entry} />
    {:else if editKind == TimelineEntryKind.Activity}
        <div>Not available</div>
    {/if}
</div>
