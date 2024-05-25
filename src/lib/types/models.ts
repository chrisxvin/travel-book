export interface IPlan {
    id: string;
    title: string;
    from: Date;
    to: Date;
    schedule: ScheduleItem[];
}

export interface IScheduleEntry {
    kind: ScheduleEntryKind;
}

export interface ICity extends IScheduleEntry {
    kind: ScheduleEntryKind.City;
    date: Date;
    city: string;
    hotel?: IHotel;
}

export interface ITransport extends IScheduleEntry {
    kind: ScheduleEntryKind.Transport;
    leaveFrom?: string;
    leaveAt?: Date;
    travelBy: TransportType;
    serviceId: string;
    arriveTo?: string;
    arriveAt?: Date;
    price?: number;
    currency?: string;
}

export interface IActivity extends IScheduleEntry {
    kind: ScheduleEntryKind.Activity;
    activity: string;
}

export type ScheduleItem = ICity | ITransport | IActivity;

export interface IHotel {
    name: string;
    address: string;
    price: number;
    currency: string;
}

export enum ScheduleEntryKind {
    City = "city",
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
