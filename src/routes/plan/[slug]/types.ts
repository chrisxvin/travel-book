import type { TimelineEntryKind } from "$lib/types";

export interface AddNewItemEventArgs {
    kind: TimelineEntryKind,
    index: number,
}
