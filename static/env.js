window.DEBUG = import.meta?.env?.VITE_DEBUG === "true" || window.sessionStorage.getItem("__DEBUG__") === "1";
window.TRACE = import.meta?.env?.VITE_TRACE === "true" || window.sessionStorage.getItem("__TRACE__") === "1";

window.DEBUG && console.log("DEBUG is active.");
window.TRACE && console.log("TRACE is active.");
