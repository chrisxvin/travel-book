import { DateTime } from "luxon";

export function showDate(date: Date | string): string {
    return typeof date === "string" ? date : DateTime.fromJSDate(date, { zone: "UTC" }).toFormat("MMdd");
}

export function showTime(time: Date | string): string {
    return typeof time === "string" ? time : DateTime.fromJSDate(time, { zone: "UTC" }).toFormat("hh:mm");
}
