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

export type TimelineItem = ITimelineEntry;

export interface ITimelineEntry {
    city: string;
    departFrom?: string;
    departAt?: string;
    travelBy: TransportType;
    serviceId?: string;
    arriveTo?: string;
    arriveAt?: string;
    price?: number;
    currency?: string;
    comment?: string;
    activity?: string;
}

export interface IHotel {
    name: string;
    address: string;
    price: number;
    currency: string;
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
