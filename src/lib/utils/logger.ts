/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const error = console.error.bind(console);
export const warn = console.warn.bind(console);
export const info = console.info.bind(console);
export const debug = globalThis.DEBUG ? console.log.bind(console) : () => { };
export const trace = globalThis.TRACE ? console.debug.bind(console) : () => { };

export const _log = console.log.bind(console) as any;
_log.error = error;
_log.warn = warn;
_log.info = info;
_log.debug = debug;
_log.trace = trace;

export const log: LogFunction & ILogger = _log;
