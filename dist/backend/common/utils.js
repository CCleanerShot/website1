"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const configdata_1 = require("./structures/classes/configdata");
const amazonitem_1 = require("./structures/classes/amazonitem");
const userdata_1 = require("./structures/classes/userdata");
const CONFIG_PATH = "./data/config.json";
const ITEM_PATH = "./data/items.json";
const USER_PATH = "./data/users.json";
const utils = {
    configData: new configdata_1.ConfigData(),
    itemData: [],
    userData: [],
    getContents: function (url, cssSelector) {
        const splitURL = url.split(/\/+/);
        const baseURL = [splitURL[0], splitURL[1]].join("/") + "/";
        const paths = splitURL.slice(2).join("/") + "/";
        const AxiosInstance = axios_1.default.create({
            baseURL: baseURL,
            timeout: 5000,
        });
        return new Promise((res, rej) => {
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
            };
            const contents = AxiosInstance.get(paths, { headers: headers }).then((res) => {
                console.log("got a response!");
                const $ = (0, cheerio_1.load)(res.data);
                return $(cssSelector).prop("innerHTML") || false;
            }).catch((rej) => {
                return false;
            });
            if (contents) {
                res(contents);
            }
            else {
                rej("Unable to get contents. Perhaps an invalid link? Otherwise, possibly the amazon item page has changed.");
            }
        });
    },
    convertToJSON: (input) => {
        return JSON.parse(input);
    },
    loadFile: (path) => {
        return new Promise((res, rej) => {
            fs_1.default.readFile(path, "utf-8", (err, data) => {
                if (data)
                    res(data);
                if (err)
                    rej(`Failed to load file at ${path}`);
            });
        });
    },
    saveFile: (path, contents) => {
        return new Promise((res, rej) => {
            fs_1.default.writeFile(path, contents, (err) => {
                if (err)
                    rej(err);
                else
                    res(`Saved successfully at ${path}`);
            });
        });
    },
    loadConfig: (configPath = CONFIG_PATH) => {
        const data = new configdata_1.ConfigData();
        utils.loadFile(configPath)
            .then(res => {
            const result = utils.convertToJSON(res);
            data.lastRequestTime = result.lastRequestTime;
            data.lastRequestWindow = result.lastRequestWindow;
            data.requestsMax = result.requestsMax;
        }).catch(rej => {
            // nothing 
            console.log(rej);
        });
        return data;
    },
    saveConfig: (configPath = CONFIG_PATH) => {
        const formattedData = JSON.stringify(utils.configData, null, 2);
        utils.saveFile(configPath, formattedData);
    },
    loadUsers: (userPath = USER_PATH) => {
        const data = [];
        utils.loadFile(userPath)
            .then(res => {
            const result = utils.convertToJSON(res);
            result.forEach(i => {
                const user = new userdata_1.UserData(i.username, i.password, i.items);
                data.push(user);
            });
        }).catch(rej => {
            // nothing 
            console.log(rej);
        });
        return data;
    },
    saveUsers: (userPath = USER_PATH) => {
        // utils.userData.push(new UserData("Tom", "123"));
        // utils.userData.push(new UserData("Bob", "zxc", ["dswhns"]));
        const formattedData = JSON.stringify(utils.userData, null, 2);
        utils.saveFile(userPath, formattedData);
    },
    loadAmazonItems: (itemPath = USER_PATH) => {
        const data = [];
        utils.loadFile(itemPath)
            .then(res => {
            const result = utils.convertToJSON(res);
            result.forEach(i => {
                const item = new amazonitem_1.AmazonItem(i.name, i.url, i.prices, i.watchers, i.startDate);
                data.push(item);
            });
        }).catch(rej => {
            // nothing 
            console.log(rej);
        });
        return data;
    },
    saveAmazonItems: (itemPath = ITEM_PATH) => {
        // utils.itemData.push(new AmazonItem("asdhas", "sd2w", [2.44, 2.11]))
        // utils.itemData.push(new AmazonItem("asdhasa", "sd2wx"))
        const formattedData = JSON.stringify(utils.itemData, null, 2);
        utils.saveFile(itemPath, formattedData);
    },
    findAmazonItem: (searchUrl) => {
        return utils.itemData.find(item => item.url == searchUrl);
    },
    addAmazonItem: (item) => {
        utils.itemData.push(item);
    },
    findUser: (searchUser) => {
        return utils.userData.find(user => user.username == searchUser);
    },
    addUser: (user) => {
        utils.userData.push(user);
    },
    isTimeout: () => {
        if (utils.configData.needsResetting())
            utils.configData.reset();
        const requests = utils.configData.requests;
        const requestsMax = utils.configData.requestsMax;
        return requests <= requestsMax;
    }
};
module.exports = utils;
//# sourceMappingURL=utils.js.map