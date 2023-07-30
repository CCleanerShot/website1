import { load } from "cheerio";
import axios from "axios";
import fs from "fs"

import utils from "./common/utils";
import localserver from "./localserver";

utils.configData = utils.loadConfig();
utils.itemData = utils.loadAmazonItems();
utils.userData = utils.loadUsers();
utils.saveUsers();

setTimeout(() => {
    console.log(utils.configData)
    console.log(utils.itemData)
    console.log(utils.userData)
    console.log(utils.userData[0])
    utils.saveConfig()
    utils.saveAmazonItems()
    utils.saveUsers()
}, 5000)
localserver.start();


