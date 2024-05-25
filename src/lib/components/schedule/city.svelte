<script lang="ts">
import type {ICity} from "$lib/types";

import { showDate } from "$lib/utils";

export let city: ICity;

</script>

<h1>
    <span>{showDate(city.date)}</span>
    <span>{city.city}</span>
    <!-- <span>{city.hotel}</span> -->
</h1>
