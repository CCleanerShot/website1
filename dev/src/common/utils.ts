import express, { Express, Request, Response } from "express";
import { load } from "cheerio";
import axios from "axios";
import fs from "fs"

import { ConfigData } from "./structures/classes/configdata";
import { json } from "stream/consumers";


const utils = {
    getContents: function (url: string, cssSelector?: string) {},
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

utils.isTimeout = () => {
    const foundData = new ConfigData;
    fs.readFile('../../data/config.json', (err, data) => {
        // if(data) {
        //     const parse = JSON.parse(data);
        //     foundData.lastRequestTime = data.lastRequestTime
        // }

        console.log("data");
        console.log(data);
    })
}

export = utils;