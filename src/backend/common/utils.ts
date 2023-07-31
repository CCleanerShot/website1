import { Cheerio, CheerioAPI, load } from "cheerio";
import axios from "axios";
import fs from "fs";

import { ConfigData } from "./structures/classes/configdata";
import { AmazonItem } from "./structures/classes/amazonitem";
import { UserData } from "./structures/classes/userdata";

const baseURL = "https://www.amazon.com/";
const CONFIG_PATH = "./data/config.json";
const ITEM_PATH = "./data/items.json";
const USER_PATH = "./data/users.json";
const CSS_SELECTOR_NAME = "span#productTitle";
const CSS_SELECTOR_PRICE = "#tp_price_block_total_price_ww > .a-offscreen:first";
const AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});
interface UtilInterface {
    configData: ConfigData;
    itemData: AmazonItem[];
    userData: UserData[];
    getBaseContents(url: string): Promise<CheerioAPI>;
    getSpecificContents(url: string, cssSelector?: string): Promise<string>;
    convertToJSON(input: string): Object;
    loadFile(path: string): Promise<string>;
    saveFile(path: string, contents: string): any;
    loadConfig(configPath?: string): ConfigData;
    saveConfig(configPath?: string): void;
    loadUsers(userPath?: string): UserData[];
    saveUsers(userPath?: string): void;
    loadAmazonItems(itemPath?: string): AmazonItem[];
    saveAmazonItems(itemPath?: string): void;

    findAmazonItem(searchUrl: string): AmazonItem | undefined;
    addAmazonItem(item: AmazonItem): void;
    findUser(searchUser: string, searchPassword?: string): UserData | undefined;
    addUser(user: UserData): void;
    isTimeout(): boolean;

    fetchAmazonItemFromSite(url: string): Promise<AmazonItem>;
    fetchAmazonPrice(url: string): Promise<number>;
    updateAmazonItem(item: AmazonItem): boolean;
    updateAmazonItems(): void;
}

const utils: UtilInterface = {
    configData: new ConfigData(),
    itemData: [] as AmazonItem[],
    userData: [] as UserData[],


    getBaseContents: (url: string): Promise<CheerioAPI> => {
        const splitURL = url.split(/\/+/)
        const paths = splitURL.slice(2).join("/") + "/"
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
        }

        return new Promise((res, rej) => {
            AxiosInstance.get(
                paths, 
                {headers: headers},
            ).then((GETRes) => {
                const $ = load(GETRes.data);
                if($)
                    res($)
                else
                    rej("Unable to turn response to CheerioAPI!");
            }).catch((GETRej) => {
                console.log("rejected!", GETRej);
                rej("GET")
            });
        });
    },

    getSpecificContents: (url: string, cssSelector?: string): Promise<string> => {
        const splitURL = url.split(/\/+/)
        const paths = splitURL.slice(2).join("/") + "/"

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
                return $(cssSelector).prop("innerHTML") || ""
            }).catch((rej) => {
                return "";
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
        const formattedData = JSON.stringify(utils.userData, null, 2);
        utils.saveFile(userPath, formattedData);
    },


    loadAmazonItems: (itemPath = USER_PATH): AmazonItem[] => {
        const data = [] as AmazonItem[];

        utils.loadFile(itemPath)
        .then(res => {
            const result = utils.convertToJSON(res) as [] as any[]
            result.forEach(i => {
                const item = new AmazonItem(i.name, i.url, i.prices, i.watchers, i.lastUpdated);
                data.push(item)
            });
        }).catch(rej => {
            // nothing 
            console.log(rej)
        })

        return data;
    },

    
    saveAmazonItems: (itemPath = ITEM_PATH) => {
        const formattedData = JSON.stringify(utils.itemData, null, 2);
        utils.saveFile(itemPath, formattedData);
    },


    findAmazonItem: (searchUrl: string): AmazonItem | undefined => {
        return utils.itemData.find(item => item.url == searchUrl);
    },
    

    addAmazonItem: (item: AmazonItem) => {
        utils.itemData.push(item);
    },


    findUser: (searchUser: string, searchPassword?: string): UserData | undefined => {
        if(searchPassword)
            return utils.userData.find(user => user.username == searchUser && user.password == searchPassword);
        else
            return utils.userData.find(user => user.username == searchUser);
    },


    addUser: (user: UserData) => {
        utils.userData.push(user);
    },


    isTimeout: () => {
        if(utils.configData.needsResetting())
            utils.configData.reset();
    
        const requests = utils.configData.requests;
        const requestsMax = utils.configData.requestsMax;
        return requests <= requestsMax;
    },

    fetchAmazonItemFromSite: (url: string): Promise<AmazonItem> => {
        return new Promise((res, rej) => {
            utils.getBaseContents(url)
            .then($ => {
                const name = $(CSS_SELECTOR_NAME).prop("innerHTML");
                const price_ = $(CSS_SELECTOR_PRICE).prop("innerHTML");
                if(!name || !price_) {
                    rej("COULD NOT FIND NAME AND/OR PRICE!");
                } else {
                    const price = parseFloat(price_.replace("$", ""));
                    const newItem = new AmazonItem(name, url, [price]);
                    res(newItem);
                }
            }).catch(CheerioRej => {
                console.log("failed!");
                return undefined;
            })
        })
    },

    fetchAmazonPrice: (url: string): Promise<number> => {
        return new Promise((res, rej) => {
            utils.getSpecificContents(url, CSS_SELECTOR_PRICE)
            .then(price => {
                res(parseFloat(price));
            }).catch(contentsRej => {
                rej(contentsRej);
            })
        })
    },

    updateAmazonItem: (item: AmazonItem): boolean => {
        const oneday = 86400000;
        const now = Date.now();

        if(utils.findAmazonItem(item.url)) {
            if(now - item.lastUpdated > oneday) {
                utils.fetchAmazonPrice(item.url)
                .then((validItem) => {
                    item.prices.push(validItem);
                });

                return true
            }
        }
        
        return false;
    },

    updateAmazonItems: () => {
        const oneday = 86400000;
        const now = Date.now();

        utils.itemData.forEach(item => {
            if(now - item.lastUpdated > oneday) {
                utils.fetchAmazonPrice(item.url)
                .then((validItem) => {
                    item.prices.push(validItem);
                })
            }
        })
    }
}


export = utils;