"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigData = void 0;
class ConfigData {
    constructor(lastRequestTime = Date.now(), lastRequestWindow = 60, requests = 0, requestsMax = 6) {
        this.lastRequestTime = lastRequestTime;
        this.lastRequestWindow = lastRequestWindow;
        this.requests = requests;
        this.requestsMax = requestsMax;
    }
}
exports.ConfigData = ConfigData;
//# sourceMappingURL=configdata.js.map