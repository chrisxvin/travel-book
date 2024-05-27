/*
 * Original code: https://github.com/beyonk-group/async-script-loader/blob/master/index.js
 */

export interface ILoaderEntry {
    type: "script" | "link";
    url: string;
    content?: string;
    options?: { async: boolean; defer: boolean };
}

export function loadScriptAsync(entries: ILoaderEntry[], test: Function, callback: Function): any {
    let remaining = entries.length;

    const maybeCallback = () => {
        remaining = --remaining;
        if (remaining < 1) {
            callback();
        }
    };

    if (test()) {
        return callback();
    }

    for (const { type, url, content, options = { async: true, defer: true } } of entries) {
        const tag = document.createElement(type);
        const isScript = tag instanceof HTMLScriptElement;
        const attribute = isScript ? "src" : "href";
        const hasUrl = Boolean(url).valueOf();

        if (isScript) {
            tag.async = options.async;
            tag.defer = options.defer;
        } else {
            tag.rel = "stylesheet";
        }

        if (hasUrl) {
            (tag as any)[attribute] = url;
        } else {
            tag.appendChild(document.createTextNode(content ?? ""));
        }

        tag.onload = maybeCallback;
        document.body.appendChild(tag);
    }
}
