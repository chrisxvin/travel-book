<script lang="ts">
import type { IPlace } from "$lib/types";

import { showDate } from "$lib/utils";

export let place: IPlace;
</script>

<h1>
    <span>{showDate(place.date)},</span>
    <span>{place.city},</span>
    <span>{place.place},</span>
    <span>{place.hotel}</span>
</h1>
