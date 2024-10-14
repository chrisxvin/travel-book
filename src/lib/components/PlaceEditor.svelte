<script lang="ts">
interface IProps {
    placeholder?: string;
    value?: string;
}
let { placeholder, value = $bindable() }: IProps = $props();
</script>

<!-- <GoogleMapsPlacesAutocomplete apiKey={GOOGLE_API_KEY} styleClass="input input-bordered join-item" onplaceChanged={gma_PlaceChanged} value={editingItem.city} language="zh" /> -->
<label class="input input-bordered join-item flex w-full items-center gap-2">
    <span class="mdi mdi-map-marker"></span>
    <input type="text" class="grow" {placeholder} bind:value />
</label>
