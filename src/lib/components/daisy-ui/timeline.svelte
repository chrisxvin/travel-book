<script lang="ts">
export let items: any[] = [];
export let vertical = false;
</script>

<ul class="timeline" class:timeline-vertical={vertical}>
    {#each items as item, i}
        <li>
            {#if i !== 0}<hr />{/if}
            <div class="timeline-start">
                <slot name="start" {item} />
            </div>
            <div class="timeline-middle">
                <slot name="middle" {item}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg>
                </slot>
            </div>
            <div class="timeline-end">
                <slot name="end" {item} />
            </div>
            {#if i !== items.length}<hr />{/if}
        </li>
    {/each}
</ul>
