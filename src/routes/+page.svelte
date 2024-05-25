<script lang="ts">
import type { PageData } from "./$types";

import { showDate } from "$lib/utils";

export let data: PageData;
export const plans = data.plans;
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
    {#each plans as plan}
        <h1><a href={`/plan/${plan.id}`}>{plan.title}</a></h1>
        <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p>
    {/each}
</section>
