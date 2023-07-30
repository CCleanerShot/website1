export class AmazonItem {
    name: string;
    url: string;
    prices: number[];
    watchers: string[];

    constructor(
    name: string,
    url: string,
    prices: number[] = [],
    watchers: string[] = []
    ) {
        this.name = name;
        this.url = url;
        this.prices = prices;
        this.watchers = watchers;
    }

}