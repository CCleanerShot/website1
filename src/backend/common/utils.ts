import { CheerioAPI, load } from "cheerio";
import axios from "axios";
import fs from "fs"

import { ConfigData } from "./structures/classes/configdata";

const CONFIG_PATH = "../../data/config.json"

const utils = {
    configData: new ConfigData,
    getContents: function (url: string, cssSelector?: string): any{},
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

    return new Promise((res, rej) => {
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
        }
        const contents = AxiosInstance.get(
            paths, 
            {headers: headers},
        ).then((res) => {
            console.log("got a response!")
            const $ = load(res.data);
            return $(cssSelector).prop("innerHTML") || false
        }).catch((rej) => {
            return false;
        });
    
        if(contents) {
            res(contents)
        } else {
            rej("Unable to get contents. Perhaps an invalid link? Otherwise, possibly the amazon item page has changed.")
        }
    })

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

export = utils;