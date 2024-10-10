declare global {
    // interface Navigator  {
    //     log: LogFunction & ILogger;
    // }

    var TRACE: boolean;
    var DEBUG: boolean;
    var RELEASE: boolean;
    var log: LogFunction & ILogger;
}

// declare namespace NodeJS {
//     declare interface Global {
//         log: LogFunction & ILogger;
//     }

//     var log: LogFunction & ILogger;
// }

declare var globalThis: Global & typeof globalThis;
declare const log: LogFunction & ILogger;

export { };
