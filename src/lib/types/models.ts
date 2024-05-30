export interface IPlan {
    id: string;
    title: string;
    from: string;
    to: string;
    itinerary: Record<string, ScheduleItem[]>;
    // schedule: ScheduleItem[];
}

export interface IScheduleEntry {
    kind: ScheduleEntryKind;
}

export interface IPlace extends IScheduleEntry {
    kind: ScheduleEntryKind.Place;
    city: string;
    place?: string;
}

export interface ITransport extends IScheduleEntry {
    kind: ScheduleEntryKind.Transport;
    leaveFrom?: string;
    leaveAt?: string;
    travelBy: TransportType;
    serviceId: string;
    arriveTo?: string;
    arriveAt?: string;
    price?: number;
    currency?: string;
}

export interface IActivity extends IScheduleEntry {
    kind: ScheduleEntryKind.Activity;
    activity: string;
}

export type ScheduleItem = IPlace | ITransport | IActivity;

export interface IHotel {
    name: string;
    address: string;
    price: number;
    currency: string;
}

export enum ScheduleEntryKind {
    Unknown,
    Place = "place",
    Transport = "transport",
    Activity = "activity",
}

export enum TransportType {
    Driving = "Driving",
    Taxi = "Taxi",
    Bus = "Bus",
    Metro = "Metro",
    Train = "Train",
    Plane = "Plane",
    Ship = "Ship",
    Walk = "Walk",
    Other = "Other",
}
