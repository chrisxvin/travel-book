import type { ITransport, IActivity, IPlace } from "./models";

export interface ISupportEditing {
    isEditing?: boolean;
}

export type IPlaceViewModel = IPlace & ISupportEditing;
export type ITransportViewModel = ITransport & ISupportEditing;
export type IActivityViewModel = IActivity & ISupportEditing;
export type TimelineViewModel = IPlaceViewModel | ITransportViewModel | IActivityViewModel;
