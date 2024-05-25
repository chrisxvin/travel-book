import type { SchemaDefinition } from "mongoose";
import type { ITransportation, ICity, IPlan, IScheduleEntry, ScheduleItem, IActivity } from "$lib/types";

import { model, Schema } from "mongoose";
import { ScheduleEntryKind, TransportationType } from "$lib/types";

const options = { discriminatorKey: "kind" };

export const ScheduleEntrySchema = new Schema<IScheduleEntry>({
    kind: {
        type: String,
        enum: [ScheduleEntryKind.City, ScheduleEntryKind.Transportation, ScheduleEntryKind.Activity],
    },
}, {
    _id: false,
});

ScheduleEntrySchema.discriminator(
    ScheduleEntryKind.City,
    new Schema<ICity>(
        {
            date: Date,
            city: String,
            hotel: String,
        },
        options,
    ),
);
ScheduleEntrySchema.discriminator(
    ScheduleEntryKind.Transportation,
    new Schema<ITransportation>(
        {
            leaveFrom: String,
            leaveAt: Date,
            travelBy: {
                type: String,
                enum: [
                    TransportationType.Driving,
                    TransportationType.Taxi,
                    TransportationType.Bus,
                    TransportationType.Metro,
                    TransportationType.Train,
                    TransportationType.Plane,
                    TransportationType.Ship,
                    TransportationType.Walk,
                    TransportationType.Other,
                ],
            },
            serviceId: String,
            arriveTo: String,
            arriveAt: Date,
            price: Number,
            currency: String,
        },
        options,
    ),
);
ScheduleEntrySchema.discriminator(
    ScheduleEntryKind.Activity,
    new Schema<IActivity>(
        {
            activity: String,
        },
        options,
    ),
);

const PlanDef: SchemaDefinition<IPlan> = {
    title: String,
    from: Date,
    to: Date,
    schedule: [ScheduleEntrySchema],
};
export const PlanSchema = new Schema<IPlan>(PlanDef);

export const Plan = model<IPlan>("plans", PlanSchema);
