declare global {
    interface Window {
        GMapsReady?: Function;
    }
}

declare var window: Window & typeof globalThis;

export { };
