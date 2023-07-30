import { CheerioAPI, load } from "cheerio";
import axios from "axios";
import fs from "fs";

import { ConfigData } from "./structures/classes/configdata";
import { AmazonItem } from "./structures/classes/amazonitem";
import { UserData } from "./structures/classes/userdata";
import { ItemData } from "./structures/types/itemdata";

const CONFIG_PATH = "./data/config.json";
const ITEM_PATH = "./data/items.json";
const USER_PATH = "./data/users.json";

interface UtilInterface {
    configData: ConfigData;
    itemData: AmazonItem[];
    userData: UserData[];
    getContents(url: string, cssSelector?: string): any;
    convertToJSON(input: string): Object;
    loadFile(path: string): Promise<string>;
    saveFile(path: string, contents: string): any;
    loadConfig(configPath?: string): ConfigData;
    saveConfig(configPath?: string): void;
    loadUsers(userPath?: string): UserData[];
    saveUsers(userPath?: string): void;
    loadAmazonItems(itemPath?: string): AmazonItem[];
    saveAmazonItems(itemPath?: string): void;

    findItem(searchUrl: string): void;
    isTimeout(): boolean;
}

const utils: UtilInterface = {
    configData: new ConfigData(),
    itemData: [] as AmazonItem[],
    userData: [] as UserData[],
    getContents: function (url: string, cssSelector?: string) {
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
    
    },
    

    convertToJSON: (input): Object => {
        return JSON.parse(input)
    },


    loadFile: (path: string): Promise<string> => {
        return new Promise((res, rej) => {
            fs.readFile(path, "utf-8", (err, data) => {
                if(data)
                    res(data);
                if(err)
                    rej(`Failed to load file at ${path}`);
            })
        })
    },
    
    
    saveFile: (path: string, contents: string): Promise<string> => {
        return new Promise((res, rej) => {
            fs.writeFile(path, contents, (err) => {
                if(err)
                    rej(err);
                else
                    res(`Saved successfully at ${path}`);
            });
        })
    },
    

    loadConfig: (configPath = CONFIG_PATH): ConfigData => {
        const data = new ConfigData();

        utils.loadFile(configPath)
        .then(res => {
            const result = utils.convertToJSON(res) as any
            data.lastRequestTime = result.lastRequestTime;
            data.lastRequestWindow = result.lastRequestWindow;
            data.requestsMax = result.requestsMax;
        }).catch(rej => {
            // nothing 
            console.log(rej)

        })

        return data;
    },
    

    saveConfig: (configPath = CONFIG_PATH) => {
        const formattedData = JSON.stringify(utils.configData, null, 2);
        utils.saveFile(configPath, formattedData);
    },
    

    loadUsers: (userPath = USER_PATH): UserData[] => {
        const data = [] as UserData[];

        utils.loadFile(userPath)
        .then(res => {
            const result = utils.convertToJSON(res) as [] as any[]
            result.forEach(i => {
                const user = new UserData(i.username, i.password, i.items)
                data.push(user)
            });
        }).catch(rej => {
            // nothing 
            console.log(rej)
        })

        return data;
    },


    saveUsers: (userPath = USER_PATH) => {
        // utils.userData.push(new UserData("Tom", "123"));
        // utils.userData.push(new UserData("Bob", "zxc", ["dswhns"]));

        const formattedData = JSON.stringify(utils.userData, null, 2);
        utils.saveFile(userPath, formattedData);
    },


    loadAmazonItems: (itemPath = USER_PATH): AmazonItem[] => {
        const data = [] as AmazonItem[];

        utils.loadFile(itemPath)
        .then(res => {
            const result = utils.convertToJSON(res) as [] as any[]
            result.forEach(i => {
                const item = new AmazonItem(i.name, i.url, i.prices, i.watchers)
                data.push(item)
            });
        }).catch(rej => {
            // nothing 
            console.log(rej)
        })

        return data;
    },

    
    saveAmazonItems: (itemPath = ITEM_PATH) => {
        // utils.itemData.push(new AmazonItem("asdhas", "sd2w", [2.44, 2.11]))
        // utils.itemData.push(new AmazonItem("asdhasa", "sd2wx"))

        const formattedData = JSON.stringify(utils.itemData, null, 2);
        utils.saveFile(itemPath, formattedData);
    },


    findItem: (searchUrl: string) => {
    
    },
    
    isTimeout: () => {
        if(utils.configData.needsResetting())
            utils.configData.reset();
    
        const requests = utils.configData.requests;
        const requestsMax = utils.configData.requestsMax;
        return requests <= requestsMax;
    }
}


export = utils;