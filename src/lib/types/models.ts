export interface IPlan {
    id: string;
    title: string;
    itinerary: IItineraryItem[];
}

export interface IPlanEx extends IPlan {
    from: string;
    to: string;
}

export interface IItineraryItem {
    date: string;
    timeline: TimelineItem[];
}

export type TimelineItem = IUnknownItem | IPlace | ITransport | IActivity;

export interface ITimelineEntry {
    kind: TimelineEntryKind;
    comment?: string;
}

export interface IUnknownItem extends ITimelineEntry {
    kind: TimelineEntryKind.Unknown;
}

export interface IPlace extends ITimelineEntry {
    kind: TimelineEntryKind.Place;
    city: string;
    place?: string;
}

export interface ITransport extends ITimelineEntry {
    kind: TimelineEntryKind.Transport;
    leaveFrom?: string;
    leaveAt?: string;
    travelBy: TransportType;
    serviceId: string;
    arriveTo?: string;
    arriveAt?: string;
    price?: number;
    currency?: string;
}

export interface IActivity extends ITimelineEntry {
    kind: TimelineEntryKind.Activity;
    activity: string;
}

export interface IHotel {
    name: string;
    address: string;
    price: number;
    currency: string;
}

export enum TimelineEntryKind {
    Unknown = 0,
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
