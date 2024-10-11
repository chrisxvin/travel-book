import { TimelineEntryKind, TransportType, type TimelineItem } from "$lib/types";

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
