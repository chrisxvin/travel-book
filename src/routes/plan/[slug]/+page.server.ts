import type { PageServerLoad } from "./$types";
import type { IPlan } from "$lib/types";

import { error } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { ObjectId } from "mongodb";

export const load: PageServerLoad = async ({ params }) => {
    const plans = await db.collection<IPlan>("plans").find(new ObjectId(params.slug)).toArray();
    
    if (plans && plans.length > 0) return {
        plan: {
            ...plans[0],
            _id: plans[0]._id.toHexString(),
        },
    };

    error(404, "Not found");
};
