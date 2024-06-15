<script>
export let className = "";
export let icon = "emoticon-wink-outline";
export let square = true;
</script>

<div class={className} class:md-icon-square={square}>
    <span class={`mdi mdi-${icon}`}></span>
</div>

<style>
.md-icon-square {
    --wh: 1em;
    width: var(--wh);
    height: var(--wh);
    line-height: var(--wh);
}
</style>
