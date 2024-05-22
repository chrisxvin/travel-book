import { error } from "@sveltejs/kit";
// import { prisma } from "$lib/server/db";
import "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => { 
    /*
    const plans = await prisma.plan.findMany();
    if (plans) return {
        plans,
    };
    */
    error(404, "Not found");
};
