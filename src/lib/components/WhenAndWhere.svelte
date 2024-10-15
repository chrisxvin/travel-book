<script lang="ts">
import { PlaceEditor } from ".";

interface IProps {
    when?: string;
    where?: string;
}
let { when = $bindable(), where = $bindable() }: IProps = $props();
</script>

<div class="join">
    <input type="time" class="input join-item input-bordered w-28" placeholder="At" bind:value={when} />
    <PlaceEditor placeholder="From" bind:value={where} />
</div>
