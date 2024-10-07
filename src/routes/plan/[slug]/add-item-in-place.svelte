<script lang="ts">
import { TimelineEntryKind } from "$lib/types";
import { pascalCase } from "change-case";

interface IProps {
    cancel: Action;
    done: Action1<TimelineEntryKind>;
}
let { cancel, done }: IProps = $props();

const items: {
    type: TimelineEntryKind;
    caption: string;
}[] = [
    {
        type: TimelineEntryKind.Place,
        caption: pascalCase(TimelineEntryKind.Place),
    },
    {
        type: TimelineEntryKind.Transport,
        caption: pascalCase(TimelineEntryKind.Transport),
    },
    {
        type: TimelineEntryKind.Activity,
        caption: pascalCase(TimelineEntryKind.Activity),
    },
];

</script>

<div class="add-new-item-inplace flex flex-row m-2 gap-2">
    <div class="join">
        {#each items as item}
            <button class="btn btn-outline btn-primary join-item" onclick={() => done(item.type)}>{item.caption}</button>
        {/each}
    </div>

    <button class="btn btn-ghost" onclick={cancel}>Cancel</button>
</div>
