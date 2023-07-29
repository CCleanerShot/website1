"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigData = void 0;
class ConfigData {
    constructor(lastRequestTime = Date.now(), lastRequestWindow = 60, requestsMax = 6, requests = 0) {
        this.lastRequestTime = lastRequestTime;
        this.lastRequestWindow = lastRequestWindow;
        this.requestsMax = requestsMax;
        this.requests = requests;
    }
    reset() {
        this.lastRequestTime = Date.now();
        this.requests = 0;
    }
    needsResetting() {
        if (this.lastRequestTime - Date.now() > this.lastRequestWindow) {
            return true;
        }
        else {
            return false;
        }
    }
    needsTimeout() {
        return this.requests <= this.requestsMax;
    }
}
exports.ConfigData = ConfigData;
//# sourceMappingURL=configdata.js.map