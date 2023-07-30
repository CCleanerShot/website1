export class AmazonItem {
    name: string;
    url: string;
    prices: number[];
    watchers: string[];
    lastUpdated: number;

    constructor(
    name: string,
    url: string,
    prices: number[] = [],
    watchers: string[] = [],
    lastUpdated: number = Date.now()
    ) {
        this.name = name;
        this.url = url;
        this.prices = prices;
        this.watchers = watchers;
        this.lastUpdated = lastUpdated;
    }

}