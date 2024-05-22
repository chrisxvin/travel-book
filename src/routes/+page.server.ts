import { error } from "@sveltejs/kit";
// import { prisma } from "$lib/server/db";
import "$lib/server/db";
import type { PageServerLoad } from "./$types";
import { Plan } from "$lib/schemas";
import type { IPlan } from "$lib/types";

export const load: PageServerLoad = async ({ params }) => {
    // const plans = await prisma.plan.findMany();
    const plans = await Plan.find();
    console.log(plans);
    
    if (plans) return {
        plans: plans.map(_ => ({
            ..._.toObject(),
            _id: _.id.toString(),
        })),
    };

    error(404, "Not found");
};
