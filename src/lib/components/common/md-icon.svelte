<script lang="ts">
interface IProps {
    className: string;
    icon: string;
    square: boolean;
}
let { className = "", icon = "emoticon-wink-outline", square = true }: IProps = $props();
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
