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
