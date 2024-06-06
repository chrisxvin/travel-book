import type { PageServerLoad } from "./$types";
import type { IItineraryItem, IItineraryViewModel, IPlaceViewModel, IPlan, IPlanViewModel, TimelineItem } from "$lib/types";

import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { db } from "$lib/server/db";
import { TimelineEntryKind } from "$lib/types";
import { uniqueId } from "lodash-es";

export const load: PageServerLoad = async ({ params }) => {
    const plans = await db.collection<IPlan>("plans").find(new ObjectId(params.slug)).toArray();

    if (plans && plans.length > 0) {
        const p = plans[0];
        return {
            plan: {
                _id: p._id.toHexString(),
                title: p.title,
                from: p.itinerary.length > 0 ? p.itinerary[0].date : "",
                to: p.itinerary.length > 0 ? p.itinerary[p.itinerary.length - 1].date : "",
                itinerary: shapeItinerary(p.itinerary),
            } as IPlanViewModel,
        };
    }

    error(404, "Not found");
};

function shapeItinerary(itn: IItineraryItem[]): IItineraryViewModel[] {
    const r = itn.map<IItineraryViewModel>(item => ({
        date: item.date,
        places: groupTimelineByPlace(item.timeline),
    }));
    return r;
}

function groupTimelineByPlace(data: TimelineItem[]): IPlaceViewModel[] {
    const places: IPlaceViewModel[] = [];

    let i = 0;
    let lastPlace: IPlaceViewModel | undefined = undefined;
    while (i < data.length) {
        const item = data[i];
        if (item.kind === TimelineEntryKind.Place) {
            places.push((lastPlace = {
                _id: uniqueId("place_"),
                ...item,
             }));
            lastPlace.items == null && (lastPlace.items = []);
        } else {
            lastPlace?.items?.push({
                ...item,
            });
        }

        i++;
    }

    return places;
}
