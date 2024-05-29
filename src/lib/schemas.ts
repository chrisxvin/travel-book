import type { SchemaDefinition } from "mongoose";
import type { ITransport, IPlace, IPlan, IScheduleEntry, ScheduleItem, IActivity } from "$lib/types";

import { model, Schema } from "mongoose";
import { ScheduleEntryKind, TransportType } from "$lib/types";

const options = { discriminatorKey: "kind" };

export const ScheduleEntrySchema = new Schema<IScheduleEntry>({
    kind: {
        type: String,
        enum: [ScheduleEntryKind.Place, ScheduleEntryKind.Transport, ScheduleEntryKind.Activity],
    },
}, {
    _id: false,
});

ScheduleEntrySchema.discriminator(
    ScheduleEntryKind.Place,
    new Schema<IPlace>(
        {
            date: Date,
            city: String,
            hotel: String,
        },
        options,
    ),
);
ScheduleEntrySchema.discriminator(
    ScheduleEntryKind.Transport,
    new Schema<ITransport>(
        {
            leaveFrom: String,
            leaveAt: Date,
            travelBy: {
                type: String,
                enum: [
                    TransportType.Driving,
                    TransportType.Taxi,
                    TransportType.Bus,
                    TransportType.Metro,
                    TransportType.Train,
                    TransportType.Plane,
                    TransportType.Ship,
                    TransportType.Walk,
                    TransportType.Other,
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
