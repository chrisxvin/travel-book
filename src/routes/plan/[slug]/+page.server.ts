import type { PageServerLoad } from "./$types";
import type { IPlaceViewModel, IPlan, IPlanViewModel, ScheduleItem } from "$lib/types";

import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { db } from "$lib/server/db";
import { ScheduleEntryKind } from "$lib/types";
import { uniqueId } from "lodash-es";

export const load: PageServerLoad = async ({ params }) => {
    const plans = await db.collection<IPlan>("plans").find(new ObjectId(params.slug)).toArray();

    if (plans && plans.length > 0) {
        const p = plans[0];
        const kv = Object.entries(p.itinerary);
        return {
            plan: {
                _id: p._id.toHexString(),
                title: p.title,
                from: kv.length > 0 ? kv[0][0] : "",
                to: kv.length > 0 ? kv[kv.length - 1][0] : "",
                itinerary: shapeItinerary(p.itinerary),
            } as IPlanViewModel,
        };
    }

    error(404, "Not found");
};

function shapeItinerary(itn: Record<string, ScheduleItem[]>): Record<string, IPlaceViewModel[]> {
    const r: Record<string, IPlaceViewModel[]> = {};
    for (const date in itn) {
        r[date] = regroupScheduleItem(itn[date]);
    }
    return r;
}

function regroupScheduleItem(data: ScheduleItem[]): IPlaceViewModel[] {
    const places: IPlaceViewModel[] = [];

    let i = 0;
    let lastPlace: IPlaceViewModel | undefined = undefined;
    while (i < data.length) {
        const item = data[i];
        if (item.kind === ScheduleEntryKind.Place) {
            places.push((lastPlace = {
                _id: uniqueId("place_"),
                ...item,
             }));
            lastPlace.items == null && (lastPlace.items = []);
        } else {
            lastPlace?.items?.push(item);
        }

        i++;
    }

    return places;
}
