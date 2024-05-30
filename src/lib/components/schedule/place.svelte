<script lang="ts">
import type { IPlace } from "$lib/types";

import { showDate } from "$lib/utils";

export let place: IPlace;
</script>

<h3>
    <span class="mdi mdi-map-marker"></span>
    <span>{place.city}, {place.place}</span>
</h3>
