import type { TimelineEntryKind, TimelineItem } from "$lib/types";
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
function resetEditingItem() {
    editingItem.item = undefined;
    editingItem.list = undefined;
    editingItem.index = -1;
    editingItem.mode = EditMode.None;
}
export function getEditingItem() {
    return {
        save: () => {
            console.log(editingItem);
            if (editingItem.item != null && editingItem.list != null) {
                console.log(1111);
                if (editingItem.mode === EditMode.Add) {
                    editingItem.list.splice(editingItem.index + 1, 0, editingItem.item);
                } else if (editingItem.mode === EditMode.Edit && editingItem.index != -1) {
                    editingItem.list[editingItem.index] = editingItem.item;
                }

                editingItem.isEditing = false;
                resetEditingItem();
            }
        },
        get value() {
            return editingItem;
        },
        set value(v: IEditingItem) {
            editingItem = v;
        },
    };
}
