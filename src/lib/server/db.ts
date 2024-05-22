// import { PrismaClient } from '@prisma/client'
// import type { IPlan } from "$lib/types";
import { model, connect } from "mongoose";

// const Plan = model<IPlan>("plans", PlanSchema);

// Connection URL
const DB_URL = process.env["DB_URL"] || "mongodb://localhost:27017/travel";
const db = await connect(DB_URL);

// export const prisma = new PrismaClient();
