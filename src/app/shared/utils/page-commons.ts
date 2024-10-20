import { signal } from "@angular/core";
import { Timestamp } from "@angular/fire/firestore";
import { timestampToDate } from "./fire-timestamp";

/**
 * Class extension of page commons used in all pages.
 * @class PageCommons
 */
export class PageCommons {
    protected title: string;
    protected readonly hide = signal(false);
    protected readonly load = signal(false);

    /**
     * Constructs a new instance of PageCommons.
     * @constructor
     * @param title Title name.
     * @param speed Speed of typing text.
     * @param hideDelay Delay time before hiding the title.
     * @param afterLoadFn Function to execute after the page is loaded.
     */
    constructor(
        title: string,
        speed?: number,
        hideDelay?: number,
        afterLoadFn: (...args: any[]) => void = () => {},
    ) {
        this.title = title;
        window.scrollTo(0, 0);
        setTimeout(() => {
            this.load.set(true);
            afterLoadFn();
            setTimeout(() => {
                this.hide.set(true);
            }, hideDelay ?? 1000);
        }, (speed ?? 100) * (this.title.length + 1));
    }

    /**
     * Scrolls the page to the top.
     * @function scrollUp
     * @param top Coordinate to scroll to from the top of the page.
     * @param behavior How the scrolling happens, it can be 'auto' or 'smooth'.
     */
    protected scrollUp(top: number = 0, behavior: 'auto' | 'smooth' = 'auto') {
        window.scrollTo({ top: top,  behavior: behavior });
    }

    /**
     * Parses the date from the given timestamp.
     * @function parseDate
     * @param date Timestamp.
     * @returns Date.
     */
    protected parseDate(date: Timestamp) {
        return timestampToDate(date);
    }
}