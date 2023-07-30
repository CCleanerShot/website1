"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazonItem = void 0;
class AmazonItem {
    constructor(name, url, prices = [], watchers = [], startDate = Date.now()) {
        this.name = name;
        this.url = url;
        this.prices = prices;
        this.watchers = watchers;
        this.startDate = startDate;
    }
}
exports.AmazonItem = AmazonItem;
//# sourceMappingURL=amazonitem.js.map