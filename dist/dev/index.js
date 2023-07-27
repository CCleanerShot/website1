"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const CONFIG_PATH = "../../data/config.json";
// USERDATA CLASS
// USERDATA CLASS
// USERDATA CLASS
class UserData {
    constructor(username, password, items = []) {
        this.username = username;
        this.password = password;
        this.items = items;
    }
}
// CONFIGDATA CLASS
// CONFIGDATA CLASS
// CONFIGDATA CLASS
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
// UTILS OBJECT
// UTILS OBJECT
// UTILS OBJECT
const utils = {
    configData: new ConfigData,
    getContents: function (url, cssSelector) { },
    loadFile: function (configPath) { },
    saveFile: function (configPath, contents) { },
    loadConfig: function (configPath) { },
    saveConfig: function (configPath) { },
    loadUsers: function (configPath) { },
    saveUsers: function (configPath) { },
    isTimeout: function () { },
};
utils.getContents = (url, cssSelector) => {
    const splitURL = url.split(/\/+/);
    const baseURL = [splitURL[0], splitURL[1]].join("/") + "/";
    const paths = splitURL.slice(2).join("/") + "/";
    const AxiosInstance = axios_1.default.create({
        baseURL: baseURL,
        timeout: 5000,
    });
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    };
    const contents = AxiosInstance.get(paths, { headers: headers }).then((res) => {
        const $ = (0, cheerio_1.load)(res.data);
        if (!cssSelector)
            return $;
        else
            return $(cssSelector).attr("value");
    }).catch((rej) => {
        console.log(`SERVER ERROR CODE: ${rej}`);
    });
    return contents;
};
utils.loadFile = (filePath) => {
    return new Promise((res, rej) => {
        fs_1.default.readFile(filePath, "utf-8", (err, data) => {
            if (data)
                res(data);
            if (err)
                rej(`Failed to load file at ${filePath}`);
        });
    });
};
utils.saveFile = (filePath, contents) => {
    return new Promise((res, rej) => {
        fs_1.default.writeFile(filePath, contents, (err) => {
            if (err)
                rej(err);
            else
                res(`Saved successfully at ${filePath}`);
        });
    });
};
utils.loadConfig = (configPath = CONFIG_PATH) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield utils.loadFile(configPath);
    const foundData = new ConfigData();
    if (!data) {
        foundData.lastRequestTime = data.lastRequestTime;
        foundData.lastRequestWindow = data.lastRequestWindow;
        foundData.requests = data.requests;
        foundData.requestsMax = data.requestsMax;
    }
    if (foundData.needsResetting())
        foundData.reset();
    utils.configData = foundData;
});
utils.saveConfig = (configPath = CONFIG_PATH) => __awaiter(void 0, void 0, void 0, function* () {
    const formattedData = JSON.stringify(utils.configData, null, 2);
    utils.saveFile(configPath, formattedData);
});
utils.isTimeout = () => {
    if (utils.configData.needsResetting())
        utils.configData.reset();
    const requests = utils.configData.requests;
    const requestsMax = utils.configData.requestsMax;
    return requests <= requestsMax;
};
// NETWORKGRABBER OBJECT
// NETWORKGRABBER OBJECT
// NETWORKGRABBER OBJECT
const networkgrabber = {
    getPrice: function (url, cssSelector) { },
};
networkgrabber.getPrice = (url, cssSelector) => {
    const item = utils.getContents(url, cssSelector);
    const price = item.attr("value");
};
// INDEX.JS
// INDEX.JS
// INDEX.JS
const url = "https://www.amazon.com/Anker-PowerCore-Technology-High-Capacity-Compatible/dp/B07S829LBX/ref=sr_1_4?crid=1A9378Y50Y1TX&keywords=battery%2Bpacks%2Banker&qid=1690219592&sprefix=battery%2Bpacks%2Banker%2Caps%2C107&sr=8-4&th=1";
const cssSelector = "#attach-base-product-price";
console.log("hi!");
utils.getContents(url, cssSelector);
//# sourceMappingURL=index.js.map