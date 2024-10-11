import type { LayoutServerLoad } from "./$types";

import { error } from "@sveltejs/kit";
import { db_plan_load } from "$lib/server/db";

export const load: LayoutServerLoad = async ({ params }) => {
    const plan = await db_plan_load(params.slug);

    if (plan) {
        return {
            plan,
        };
    }

    error(404, "Not found");
};
