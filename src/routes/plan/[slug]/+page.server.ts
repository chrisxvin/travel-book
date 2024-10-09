import type { Actions, PageServerLoad } from "./$types";

import { error } from "@sveltejs/kit";
import { db_plan_load, db_plan_save } from "$lib/server/db";

export const load: PageServerLoad = async ({ params }) => {
    const plan = await db_plan_load(params.slug);

    if (plan) {
        return {
            plan,
        };
    }

    error(404, "Not found");
};

export const actions = {
    save: async ({ request }) => {
        const data = await request.formData();
        const plan = JSON.parse(String(data.get("plan")));
        const result = await db_plan_save(plan);
        console.log(result);
    },
} satisfies Actions;
