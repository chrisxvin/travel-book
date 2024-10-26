<script lang="ts">
import type { PageData } from "./$types";

import { showDate } from "$lib/utils";

interface IProps {
    data: PageData;
}
let { data }: IProps = $props();
const plans = data.plans;
</script>

<svelte:head>
    <title>Home</title>
    <meta name="description" content="Traveller's Book" />
</svelte:head>

<h1>Plans</h1>
<section class="flex flex-row gap-2 m-4">
    {#each plans as plan}
        <div class="card w-96 bg-base-100 shadow-md hover:shadow-xl">
            <figure>
                <img src="/images/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall_(cropped).jpg" alt="City" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">{plan.title}</h2>
                <p>From {showDate(plan.from)} to {showDate(plan.to)}</p>
                <div class="card-actions justify-end">
                    <!-- <button class="btn btn-primary">View</button> -->
                    <a class="btn btn-primary" href={`/plan/${plan.id}`}>View</a>
                </div>
            </div>
        </div>
    {/each}
</section>

<section>
    <h3>Table</h3>
    {#each plans as plan}
        <h1><a href={`/plan/${plan.id}/table`}>{plan.title}</a></h1>
        <p>{showDate(plan.from)} --&gt; {showDate(plan.to)}</p>
    {/each}
</section>
