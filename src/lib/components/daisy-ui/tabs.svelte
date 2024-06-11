<script lang="ts">
export let className = "tabs-bordered";
export let tabIndex = 0;
export let tabs: any[];
</script>

<div role="tablist" class={"tabs " + className}>
    {#each tabs as item, i}
        <a role="tab" class="tab" class:tab-active={tabIndex === i} on:click={e => (tabIndex = i)}>
            <slot name="header" {item} />
        </a>

        <div role="tabpanel" class="tab-content">
            <slot {item} />
        </div>
    {/each}
</div>
