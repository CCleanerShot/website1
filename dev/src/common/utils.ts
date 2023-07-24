import express, { Express, Request, Response } from "express";
import { load } from "cheerio";
import axios from "axios";


const utils = {
    getContents: function (url: string, cssSelector?: string) {},
}

utils.getContents = (url: string, cssSelector?: string) => {
    const regex = /(?<=^(?<baseURL>\w+:\/\/?[^:\/\s]+)(?:\/|$)\S*)(?<path>[^\/\s]+)?\/?/;
    const result = url.match(regex)
    console.log(url);
    console.log(result);

    const AxiosInstance = axios.create();
    AxiosInstance.get(url)
    .then((res) => {
        console.log("inside");
        const html = res.data;
        const $ = load(html);
        
        if(!cssSelector)
            return $;

        const contents = $(cssSelector).text();
        console.log(contents)    
    })
    .catch((rej) => {
        console.log(`SERVER ERROR CODE: ${rej.response.status}`);
    });
}


export = utils;