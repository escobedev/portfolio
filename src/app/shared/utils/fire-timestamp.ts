import { Timestamp } from "@angular/fire/firestore";

/**
 * Gets the date from the given timestamp.
 * @function timestampToDate
 * @param date Date of `Timestamp` class.
 * @returns Date.
 */
export function timestampToDate(date: Timestamp) {
    const timestamp = new Timestamp(date.seconds, date.nanoseconds);
    return timestamp.toDate();
}