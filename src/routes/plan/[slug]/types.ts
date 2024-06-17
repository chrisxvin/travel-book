import type { TimelineEntryKind } from "$lib/types";

export interface AddNewItemEventArgs {
    kind: TimelineEntryKind;
    index: number;
}

export enum EditMode {
    None = 0,
    Add,
    Edit,
}
