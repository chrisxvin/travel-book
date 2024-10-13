import type { TimelineEntryKind } from "$lib/types";

export interface AddNewItemEventArgs {
    kind: TimelineEntryKind;
}

export enum EditMode {
    None = 0,
    Add,
    Edit,
}

export const EditingPlan = Symbol("editing-plan");
