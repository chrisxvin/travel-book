<script lang="ts">
import { PlaceEditor } from ".";

interface IProps {
    when?: string;
    where?: string;
}
let { when = $bindable(), where = $bindable() }: IProps = $props();
</script>

<div class="join">
    <label class="input join-item input-bordered w-28 flex items-center gap-2">
        <input type="time" class="w-full" placeholder="At" bind:value={when} />
    </label>

    <PlaceEditor placeholder="From" bind:value={where} />
</div>
