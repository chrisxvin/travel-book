import type { SchemaDefinition } from "mongoose";
import type { ITransport, IPlace, IPlan, ITimelineEntry, TimelineItem, IActivity } from "$lib/types";

import { model, Schema } from "mongoose";
import { TimelineEntryKind, TransportType } from "$lib/types";

const options = { discriminatorKey: "kind" };

export const ScheduleEntrySchema = new Schema<ITimelineEntry>({
    kind: {
        type: String,
        enum: [TimelineEntryKind.Place, TimelineEntryKind.Transport, TimelineEntryKind.Activity],
    },
}, {
    _id: false,
});

ScheduleEntrySchema.discriminator(
    TimelineEntryKind.Place,
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
    TimelineEntryKind.Transport,
    new Schema<ITransport>(
        {
            departFrom: String,
            departAt: Date,
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
    TimelineEntryKind.Activity,
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
