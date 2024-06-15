import type { PageServerLoad } from "./$types";
import type { IPlan } from "$lib/types";

import { error } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { db } from "$lib/server/db";

export const load: PageServerLoad = async ({ params }) => {
    const plans = await db.collection<IPlan>("plans").find(new ObjectId(params.slug)).toArray();

    if (plans && plans.length > 0) {
        const p = plans[0];
        return {
            plan: {
                id: p._id.toHexString(),
                title: p.title,
                // from: p.itinerary.length > 0 ? p.itinerary[0].date : "",
                // to: p.itinerary.length > 0 ? p.itinerary[p.itinerary.length - 1].date : "",
                itinerary: p.itinerary,
            } as IPlan,
        };
    }

    error(404, "Not found");
};
