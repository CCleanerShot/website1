import express, { Express, Request, Response } from "express";
import { load } from "cheerio";
import axios from "axios";
import fs from "fs"

import { ConfigData } from "./structures/classes/configdata";
import { json } from "stream/consumers";

const CONFIG_PATH = "./data/config.json"
const utils = {
    configData: new ConfigData,
    getContents: function (url: string, cssSelector?: string) {},
    loadConfig: function(configPath?: string) {},
    saveConfig: function(configPath?: string) {},
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
    AxiosInstance.get(
        paths, 
        {headers: headers},
    ).then((res) => {
        console.log("inside");
        const html = res.data;
        const $ = load(html);
        
        if(!cssSelector)
            return $;
        
        const contents = $(cssSelector).text();
        console.log(contents);
        console.log($(cssSelector));
    })
    .catch((rej) => {
        console.log(`SERVER ERROR CODE: ${rej.response.status}`);
    });
}

utils.loadConfig = (configPath = CONFIG_PATH) => {
    fs.readFile(configPath, "utf-8", (err, data) => {
        const foundData = new ConfigData();
        if(data) {
            const parse = JSON.parse(data);
            foundData.lastRequestTime = parse.lastRequestTime;
            foundData.lastRequestWindow = parse.lastRequestWindow;
            foundData.requests = parse.requests;
            foundData.requestsMax = parse.requestsMax;
        }

        if(foundData.needsResetting())
            foundData.reset();

        utils.configData = foundData;
    });
}

utils.saveConfig = (configPath = CONFIG_PATH) => {
    const stringData = JSON.stringify(utils.configData);
    fs.writeFile(configPath, stringData, (err) => {
        if(err)
            console.warn(`Failed to save at ${CONFIG_PATH}.`);
    });
}

utils.isTimeout = () => {
    if(utils.configData.needsResetting())
        utils.configData.reset();

        const requests = utils.configData.requests
        const requestsMax = utils.configData.requestsMax
    return requests <= requestsMax
}

export = utils;