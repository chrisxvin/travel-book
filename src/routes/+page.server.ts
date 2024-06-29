import type { PageServerLoad } from "./$types";
import type { IPlan, IPlanEx } from "$lib/types";

import { error } from "@sveltejs/kit";
// import { prisma } from "$lib/server/db";
import { db } from "$lib/server/db";
// import { Plan } from "$lib/schemas";

export const load: PageServerLoad = async ({ params }) => {
    // const plans = await prisma.plan.findMany();
    // const plans = await Plan.find();

    // todo: Optimize: return root properties only
    const plans = await db.collection<IPlan>("plans").find().toArray();

    if (plans) {
        return {
            plans: plans.map<Exclude<IPlanEx, "itinerary">>(p => {
                const kv = Object.entries(p.itinerary);

                return {
                    title: p.title,
                    from: kv.length > 0 ? kv[0][0] : "",
                    to: kv.length > 0 ? kv[kv.length - 1][0] : "",
                    itinerary: [],
                    id: p._id.toHexString(),
                };
            }),
        };
    }

    error(404, "Not found");
};
