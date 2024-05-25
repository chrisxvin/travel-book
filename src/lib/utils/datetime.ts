import { DateTime } from "luxon";

export function showDate(date: Date): string {
    return DateTime.fromJSDate(date, { zone: "UTC" }).toFormat("MMdd");
}

export function showTime(date: Date): string {
    return DateTime.fromJSDate(date, { zone: "UTC" }).toFormat("hh:mm");
}
