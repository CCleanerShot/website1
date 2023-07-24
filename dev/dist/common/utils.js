"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const cheerio_1 = require("cheerio");
const axios_1 = __importDefault(require("axios"));
const utils = {
    getContents: function (url, cssSelector) { },
};
utils.getContents = (url, cssSelector) => {
    const regex = /(?<=^(?<baseURL>\w+:\/\/?[^:\/\s]+)(?:\/|$)\S*)(?<path>[^\/\s]+)?\/?/;
    const result = url.match(regex);
    console.log(url);
    console.log(result);
    const AxiosInstance = axios_1.default.create();
    AxiosInstance.get(url)
        .then((res) => {
        console.log("inside");
        const html = res.data;
        const $ = (0, cheerio_1.load)(html);
        if (!cssSelector)
            return $;
        const contents = $(cssSelector).text();
        console.log(contents);
    })
        .catch((rej) => {
        console.log(`SERVER ERROR CODE: ${rej.response.status}`);
    });
};
module.exports = utils;
//# sourceMappingURL=utils.js.map