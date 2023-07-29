export class ConfigData {
    lastRequestTime: number;
    lastRequestWindow: number;
    requestsMax: number;
    requests: number;

    constructor(
    lastRequestTime: number = Date.now(),
    lastRequestWindow: number = 60,
    requestsMax: number = 6,
    requests: number = 0,
    ) {
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
        } else {
            return false;
        }
    }

    needsTimeout() {
        return this.requests <= this.requestsMax
    }
}