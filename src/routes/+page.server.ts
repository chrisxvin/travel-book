import type { PageServerLoad } from "./$types";
import type { IPlan } from "$lib/types";

import { error } from "@sveltejs/kit";
// import { prisma } from "$lib/server/db";
import { db } from "$lib/server/db";
// import { Plan } from "$lib/schemas";

export const load: PageServerLoad = async ({ params }) => {
    // const plans = await prisma.plan.findMany();
    // const plans = await Plan.find();
    // todo: Optimize: return root properties only
    const plans = await db.collection<IPlan>("plans").find().toArray();
    
    if (plans) return {
        plans: plans.map<Exclude<IPlan, "schedule">>(p => ({
            title: p.title,
            from: p.from,
            to: p.to,
            schedule: [],
            id: p._id.toHexString(),
        })),
    };

    error(404, "Not found");
};
