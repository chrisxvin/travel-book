import { MongoClient, ObjectId } from "mongodb";
import { building } from "$app/environment";
import { env } from "$env/dynamic/private";
import type { IPlan } from "$lib/types";
// import { PrismaClient } from '@prisma/client'
// import { model, connect } from "mongoose";

// const Plan = model<IPlan>("plans", PlanSchema);

// Connection URL
const DEFAULT_DB_URL = "mongodb://localhost:27017";
const DB_URL_RAW = building ? DEFAULT_DB_URL : (env.DB_URL ?? env.MONGODB_URI);
const DB_NAME = "travel";

const client = new MongoClient(DB_URL_RAW);
// const db = await connect(DB_URL);

export const db = client.db(DB_NAME);
client.connect().then(() => {
    console.log("Connected successfully to server");
});

// export const prisma = new PrismaClient();

export async function db_plan_load(id: string): Promise<IPlan | null> {
    const plan = await db.collection<IPlan>("plans").findOne(new ObjectId(id));

    if (plan) {
        return {
            id: plan._id.toHexString(),
            title: plan.title,
            // from: p.itinerary.length > 0 ? p.itinerary[0].date : "",
            // to: p.itinerary.length > 0 ? p.itinerary[p.itinerary.length - 1].date : "",
            itinerary: plan.itinerary,
        } as IPlan;
    } else {
        return null;
    }
}

export function db_plan_save(plan: IPlan) {
    const _id = new ObjectId(plan.id);
    delete (plan as any).id;
    console.log("Saving plan with id:", _id, plan);
    return db.collection<IPlan>("plans").replaceOne({ _id }, plan);
}
