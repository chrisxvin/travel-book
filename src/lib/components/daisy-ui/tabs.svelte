<script lang="ts">
export let className = "tabs-bordered";
export let tabIndex = 0;
export let tabs: any[];
export let useTabPanel = true;
</script>

<div role="tablist" class={"tabs " + className}>
    {#each tabs as item, i}
        <!-- svelte-ignore a11y-interactive-supports-focus -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <a role="tab" class="tab" class:tab-active={tabIndex === i} on:click={e => (tabIndex = i)}>
            <slot name="header" {item} />
        </a>

        {#if useTabPanel}
            <div role="tabpanel" class="tab-content">
                <slot {item} />
            </div>
        {/if}
    {/each}
</div>

{#if !useTabPanel}
    {#each tabs as item, i}
        {#if tabIndex === i}
            <slot {item} />
        {/if}
    {/each}
{/if}
