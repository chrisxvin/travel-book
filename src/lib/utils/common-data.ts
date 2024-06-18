import { TransportType } from "$lib/types";

export const TransportIconMap: Record<TransportType, string> = {
    [TransportType.Driving]: "car",
    [TransportType.Taxi]: "taxi",
    [TransportType.Bus]: "bus",
    [TransportType.Metro]: "subway",
    [TransportType.Train]: "train",
    [TransportType.Plane]: "airplane",
    [TransportType.Ship]: "ferry",
    [TransportType.Walk]: "walk",
    [TransportType.Other]: "train-car",
};
