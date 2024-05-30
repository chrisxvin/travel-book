import type { PageServerLoad } from "./$types";
import type { IPlan } from "$lib/types";

import { error } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { ObjectId } from "mongodb";

export const load: PageServerLoad = async ({ params }) => {
    const plans = await db.collection<IPlan>("plans").find(new ObjectId(params.slug)).toArray();

    if (plans && plans.length > 0) {
        const p = plans[0];
        const kv = Object.entries(p.itinerary);
        return {
            plan: {
                title: p.title,
                from: kv.length > 0 ? kv[0][0] : "",
                to: kv.length > 0 ? kv[kv.length - 1][0] : "",
                itinerary: p.itinerary,
                id: p._id.toHexString(),
                // _id: p._id.toHexString(),
            } as IPlan,
        };
    }

    error(404, "Not found");
};
