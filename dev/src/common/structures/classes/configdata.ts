export class ConfigData {
    lastRequestTime: number;
    lastRequestWindow: number;
    requests: number;
    requestsMax: number;
    constructor(
        lastRequestTime: number = Date.now(),
        lastRequestWindow: number = 60,
        requests: number = 0,
        requestsMax: number = 6,
    ) {
        this.lastRequestTime = lastRequestTime;
        this.lastRequestWindow = lastRequestWindow;
        this.requests = requests;
        this.requestsMax = requestsMax;

    }
}