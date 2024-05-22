import { error, json } from "@sveltejs/kit";
import { prisma } from "$lib/server/db";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async (req) => { 
    const plans = await prisma.plan.findMany();
    return json(plans);
};
