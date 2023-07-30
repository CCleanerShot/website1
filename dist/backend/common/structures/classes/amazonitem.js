"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonItem = void 0;
class AmazonItem {
    constructor(name, url, prices = [], watchers = [], lastUpdated = Date.now()) {
        this.name = name;
        this.url = url;
        this.prices = prices;
        this.watchers = watchers;
        this.lastUpdated = lastUpdated;
    }
}
exports.AmazonItem = AmazonItem;
//# sourceMappingURL=amazonitem.js.map