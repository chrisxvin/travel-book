import { DateTime } from "luxon";

export const DATE_FORMAT = "yyyy-MM-dd";
export const TIME_FORMAT = "HH:mm";

export function showDate(date: Date | string): string {
    return typeof date === "string" ? date : DateTime.fromJSDate(date, { zone: "UTC" }).toFormat("MMdd");
}

export function showTime(time: Date | string): string {
    return typeof time === "string" ? time : DateTime.fromJSDate(time, { zone: "UTC" }).toFormat("hh:mm");
}

export function stringToDate(str?: string): DateTime {
    return DateTime.fromFormat(str ?? "", DATE_FORMAT);
}

export function stringToTime(str?: string): DateTime {
    return DateTime.fromFormat(str ?? "", TIME_FORMAT);
}
