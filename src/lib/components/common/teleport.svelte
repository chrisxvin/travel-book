<script lang="ts" context="module">
import { tick } from "svelte";

/**
 * Usage: <div use:teleport={'css selector'}> or <div use:teleport={document.body}>
 *
 * @param {HTMLElement} el
 * @param {HTMLElement|string} target DOM Element or CSS Selector
 */
export function teleport(el: HTMLElement, target: HTMLElement | string = "body") {
    let targetEl: Element | null;
    async function update(newTarget: HTMLElement | string) {
        target = newTarget;
        if (typeof target === "string") {
            targetEl = document.querySelector(target);
            if (targetEl === null) {
                await tick();
                targetEl = document.querySelector(target);
            }
            if (targetEl === null) {
                throw new Error(`No element found matching css selector: "${target}"`);
            }
        } else if (target instanceof HTMLElement) {
            targetEl = target;
        } else {
            throw new TypeError(`Unknown teleport target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
        }
        targetEl.appendChild(el);
        el.hidden = false;
    }

    function destroy() {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }

    update(target);
    return {
        update,
        destroy,
    };
}
</script>

<script lang="ts">
/**
 * DOM Element or CSS Selector
 * @type { HTMLElement|string}
 */
interface IProps {
    target: HTMLElement | string;
}
let { target = "body" }: IProps = $props();
</script>

<div use:teleport={target} hidden>
    <slot />
</div>
