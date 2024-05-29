<script lang="ts">
import { ScheduleEntryKind, type IScheduleEntry, type ITransport, type ScheduleItem } from "$lib/types";
import TransportEditor from "./transport-editor.svelte";

export let index: number;
export let entry: IScheduleEntry | null;

let editKind = ScheduleEntryKind.Unknown;

function showEditor(kind: ScheduleEntryKind): void {
    entry = {
        kind,
    } as IScheduleEntry;
    editKind = kind;
}
</script>

<div style="height: 200px">
    <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Kind</button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item">Place</a></li>
            <li><a class="dropdown-item" on:click={e => showEditor(ScheduleEntryKind.Transport)}>Transport</a></li>
            <li><a class="dropdown-item">Activity</a></li>
        </ul>
    </div>

    {#if editKind == ScheduleEntryKind.Place}
        <div>Not available</div>
    {:else if editKind == ScheduleEntryKind.Transport}
        <TransportEditor {entry} />
    {:else if editKind == ScheduleEntryKind.Activity}
        <div>Not available</div>
    {/if}
</div>
