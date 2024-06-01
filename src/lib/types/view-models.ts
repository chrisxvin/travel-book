import type { IScheduleEntry, ScheduleEntryKind, ITransport, IActivity } from "./models";

export interface IPlanViewModel {
    _id: string;
    title: string;
    from: string;
    to: string;
    itinerary: Record<string, IPlaceViewModel[]>;
}

export interface IPlaceViewModel {
    _id: string;
    city: string;
    place?: string;
    items?: (ITransport | IActivity)[];
}
