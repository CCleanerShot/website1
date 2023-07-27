import { load } from "cheerio";
import axios from "axios";
import fs from "fs"

const CONFIG_PATH = "../../data/config.json"


// GLOSSARY: 
// ITEMDATA TYPE
// USERDATA CLASS
// CONFIGDATA CLASS
// UTILS OBJECT
// NETWORKGRABBER OBJECT
// INDEX.JS


// ITEMDATA TYPE
// ITEMDATA TYPE
// ITEMDATA TYPE

type ItemData = {
    startDate: number,
    url: string,
    name: string,
    prices: number[],
} 

// USERDATA CLASS
// USERDATA CLASS
// USERDATA CLASS

class UserData {
    username: string;
    password: string;
    items: ItemData[];

    constructor(
    username: string,
    password: string,
    items: ItemData[] = []
    ) {
        this.username = username;
        this.password = password;
        this.items = items;
    }
}

// CONFIGDATA CLASS
// CONFIGDATA CLASS
// CONFIGDATA CLASS

class ConfigData {
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

// UTILS OBJECT
// UTILS OBJECT
// UTILS OBJECT

const utils = {
    configData: new ConfigData,
    getContents: function (url: string, cssSelector?: string) {},
    loadFile: function(configPath: string): any {},
    saveFile: function(configPath: string, contents: string): any {},
    loadConfig: function(configPath?: string) {},
    saveConfig: function(configPath?: string) {},
    loadUsers: function(configPath?: string) {},
    saveUsers: function(configPath?: string) {},
    isTimeout: function() {},
}

utils.getContents = (url: string, cssSelector?: string) => {
    const splitURL = url.split(/\/+/)
    const baseURL = [ splitURL[0], splitURL[1] ].join("/") + "/"
    const paths = splitURL.slice(2).join("/") + "/"
    const AxiosInstance = axios.create({
        baseURL: baseURL,
        timeout: 5000,
    });

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    }
    const contents = AxiosInstance.get(
        paths, 
        {headers: headers},
    ).then((res) => {
        const $ = load(res.data);
        if(!cssSelector)
            return $;
        else
            return $(cssSelector).attr("value");
    }).catch((rej) => {
        console.log(`SERVER ERROR CODE: ${rej}`);
    });

    return contents;
}

utils.loadFile = (filePath: string): Promise<JSON | String> => {
    return new Promise((res, rej) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if(data)
                res(data);
            if(err)
                rej(`Failed to load file at ${filePath}`);
        })
    })
}

utils.saveFile = (filePath: string, contents: string): Promise<String> => {
    return new Promise((res, rej) => {
        fs.writeFile(filePath, contents, (err) => {
            if(err)
                rej(err);
            else
                res(`Saved successfully at ${filePath}`);
        });
    })
}

utils.loadConfig = async (configPath = CONFIG_PATH) => {
    const data = await utils.loadFile(configPath)
    const foundData = new ConfigData();
    if(!data) {
        foundData.lastRequestTime = data.lastRequestTime;
        foundData.lastRequestWindow = data.lastRequestWindow;
        foundData.requests = data.requests;
        foundData.requestsMax = data.requestsMax;
    }

    if(foundData.needsResetting())
        foundData.reset();

    utils.configData = foundData;
}

utils.saveConfig = async (configPath = CONFIG_PATH) => {
    const formattedData = JSON.stringify(utils.configData, null, 2);
    utils.saveFile(configPath, formattedData);
}

utils.isTimeout = () => {
    if(utils.configData.needsResetting())
        utils.configData.reset();

    const requests = utils.configData.requests;
    const requestsMax = utils.configData.requestsMax;
    return requests <= requestsMax;
}

// NETWORKGRABBER OBJECT
// NETWORKGRABBER OBJECT
// NETWORKGRABBER OBJECT

const networkgrabber = {
    getPrice: function(url: string, cssSelector: string) {},
}

networkgrabber.getPrice = (url: string, cssSelector: string) => {
    const item: any = utils.getContents(url, cssSelector);
    const price = item.attr("value");
}

// INDEX.JS
// INDEX.JS
// INDEX.JS

const url = "https://www.amazon.com/Anker-PowerCore-Technology-High-Capacity-Compatible/dp/B07S829LBX/ref=sr_1_4?crid=1A9378Y50Y1TX&keywords=battery%2Bpacks%2Banker&qid=1690219592&sprefix=battery%2Bpacks%2Banker%2Caps%2C107&sr=8-4&th=1"
const cssSelector = "#attach-base-product-price";
console.log("hi!");

utils.getContents(url, cssSelector);

