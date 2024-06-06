import type { ITimelineEntry, TimelineEntryKind, ITransport, IActivity } from "./models";

export interface IPlanViewModel {
    _id: string;
    title: string;
    from: string;
    to: string;
    itinerary: IItineraryViewModel[];
}

export interface IItineraryViewModel {
    date: string;
    places: IPlaceViewModel[];
}

type PlaceSubItems = ITransport | IActivity;

export interface IPlaceViewModel {
    _id: string;
    city: string;
    place?: string;
    items?: PlaceSubItems[];
}
