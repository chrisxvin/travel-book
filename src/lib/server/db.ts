import { MongoClient } from "mongodb"
import { env } from "$env/dynamic/private";
// import { PrismaClient } from '@prisma/client'
// import type { IPlan } from "$lib/types";
// import { model, connect } from "mongoose";

// const Plan = model<IPlan>("plans", PlanSchema);

// Connection URL
const DEFAULT_DB_URL = "mongodb://localhost:27017";
const DB_NAME = "travel";

const client = new MongoClient(env.DB_URL ?? DEFAULT_DB_URL);
// const db = await connect(DB_URL);

export const db = client.db(DB_NAME);
client.connect().then(() => {
    console.log("Connected successfully to server");
});

// export const prisma = new PrismaClient();
