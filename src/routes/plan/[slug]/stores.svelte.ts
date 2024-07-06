import { TimelineEntryKind, TransportType, type TimelineItem } from "$lib/types";
import { EditMode } from "./types";

let tracking = $state(false);

export function getTracking() {
    return {
        get value() {
            return tracking;
        },
        set value(v: boolean) {
            tracking = v;
        },
    };
}

interface IEditingItem {
    isEditing: boolean;
    index: number;
    // type: TimelineEntryKind,
    item?: TimelineItem;
    mode: EditMode;
    list?: TimelineItem[];
}
let editingItem = $state<IEditingItem>({
    isEditing: false,
    index: -1,
    mode: EditMode.None,
});
const resetEditingItem = () => {
    editingItem.item = undefined;
    editingItem.list = undefined;
    editingItem.index = -1;
    editingItem.mode = EditMode.None;
    editingItem.isEditing = false;
}
export function getEditingItem() {
    return {
        add: (index: number, kind: TimelineEntryKind, list: TimelineItem[]) => {
            const item = {
                kind,
                // prettier-ignore
                ...(
                    kind === TimelineEntryKind.Place ? { city: "NEW CITY", } :
                    kind === TimelineEntryKind.Transport ? { travelBy: TransportType.Walk, currency: "GBP", } :
                    kind === TimelineEntryKind.Activity ? { activity: "What do you like to do?", } : 
                    {}
                ),
            } as TimelineItem;

            editingItem = {
                index,
                item: item,
                list,
                isEditing: true,
                mode: EditMode.Add,
            };
        },
        edit: (index: number, item: TimelineItem, list: TimelineItem[]) => {
            editingItem = {
                index,
                item: { ...item },
                list,
                isEditing: true,
                mode: EditMode.Edit,
            };
        },
        save: () => {
            if (editingItem.item != null && editingItem.list != null) {
                if (editingItem.mode === EditMode.Add) {
                    editingItem.list.splice(editingItem.index + 1, 0, editingItem.item);
                } else if (editingItem.mode === EditMode.Edit && editingItem.index != -1) {
                    editingItem.list[editingItem.index] = editingItem.item;
                }

                resetEditingItem();
            }
        },
        close: resetEditingItem,
        get value() {
            return editingItem;
        },
        set value(v: IEditingItem) {
            editingItem = v;
        },
    };
}
