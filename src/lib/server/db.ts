// import { PrismaClient } from '@prisma/client'
// import type { IPlan } from "$lib/types";
import { model, connect } from "mongoose";
import { Plan } from "$lib/schemas";

// const Plan = model<IPlan>("plans", PlanSchema);

// Connection URL
const DB_URL = process.env["DB_URL"] || "mongodb://localhost:27017/travel";
const db = await connect(DB_URL);

const plan = await Plan.find();
for (const s of plan[0].schedule) {
    console.log(s);
}

// console.log(plan);

// export const prisma = new PrismaClient();
