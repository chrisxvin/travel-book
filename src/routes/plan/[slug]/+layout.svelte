<script lang="ts" module>
import "./styles.less";
</script>

<script lang="ts">
import type { LayoutData } from "./$types";
import type { Snippet } from "svelte";

let {
    data, children
}: {
    data: LayoutData;
    children: Snippet;
} = $props();
export const plan = data.plan;

</script>

<svelte:head>
    <title>Plan: {plan.title}</title>
</svelte:head>

<div class="xl:mx-20 ring-1 ring-slate-900/10">
    {@render children()}
</div>
