"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const configdata_1 = require("./structures/classes/configdata");
const utils = {
    getContents: function (url, cssSelector) { },
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
    AxiosInstance.get(paths, { headers: headers }).then((res) => {
        console.log("inside");
        const html = res.data;
        const $ = (0, cheerio_1.load)(html);
        if (!cssSelector)
            return $;
        const contents = $(cssSelector).text();
        console.log(contents);
        console.log($(cssSelector));
    })
        .catch((rej) => {
        console.log(`SERVER ERROR CODE: ${rej.response.status}`);
    });
};
utils.isTimeout = () => {
    const foundData = new configdata_1.ConfigData;
    fs_1.default.readFile('../../data/config.json', (err, data) => {
        // if(data) {
        //     const parse = JSON.parse(data);
        //     foundData.lastRequestTime = data.lastRequestTime
        // }
        console.log("data");
        console.log(data);
    });
};
module.exports = utils;
//# sourceMappingURL=utils.js.map