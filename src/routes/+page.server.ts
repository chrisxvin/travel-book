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
                const result = {
                    title: p.title,
                    from: p.itinerary.length > 0 ? p.itinerary[0].date : "<Unknown date>",
                    to: p.itinerary.length > 0 ? p.itinerary.at(-1)!.date : "<Unknown date>",
                    itinerary: [],
                    id: p._id.toHexString(),
                };

                return result;
            }),
        };
    }

    error(404, "Not found");
};
