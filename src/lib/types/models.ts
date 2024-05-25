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

export interface ITransportation extends IScheduleEntry {
    kind: ScheduleEntryKind.Transportation;
    leaveFrom?: string;
    leaveAt?: Date;
    type: TransportationType;
    code: string;
    arriveTo?: string;
    arriveAt?: Date;
    price?: number;
    currency?: string;
}

export interface IActivity extends IScheduleEntry {
    kind: ScheduleEntryKind.Activity;
    activity: string;
}

export type ScheduleItem = ICity | ITransportation | IActivity;

export interface IHotel {
    name: string;
    address: string;
    price: number;
    currency: string;
}

export enum ScheduleEntryKind {
    City = "city",
    Transportation = "transportation",
    Activity = "activity",
}

export enum TransportationType {
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
