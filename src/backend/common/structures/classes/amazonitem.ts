import { start } from "repl";

export class AmazonItem {
    name: string;
    url: string;
    prices: number[];
    watchers: string[];
    startDate: number;

    constructor(
    name: string,
    url: string,
    prices: number[] = [],
    watchers: string[] = [],
    startDate: number = Date.now()
    ) {
        this.name = name;
        this.url = url;
        this.prices = prices;
        this.watchers = watchers;
        this.startDate = startDate;
    }

}