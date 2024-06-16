/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const error = window.console.error.bind(window.console);
export const warn = window.console.warn.bind(window.console);
export const info = window.console.info.bind(window.console);
export const debug = window.DEBUG ? window.console.log.bind(window.console) : () => { };
export const trace = window.TRACE ? window.console.debug.bind(window.console) : () => { };

export const _log = window.console.log.bind(window.console) as any;
_log.error = error;
_log.warn = warn;
_log.info = info;
_log.debug = debug;
_log.trace = trace;

export const log: LogFunction & ILogger = _log;

window.log = log;
