import { log } from "$lib/utils";

globalThis.log = log;
window && (window.log = log);
