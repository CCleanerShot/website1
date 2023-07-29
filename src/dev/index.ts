import { load } from "cheerio";
import axios from "axios";
import fs from "fs"

import utils from "./common/utils";
const CONFIG_PATH = "../../data/config.json"


// UTILS OBJECT
// UTILS OBJECT
// UTILS OBJECT

const url = "https://www.amazon.com/Anker-PowerCore-Technology-High-Capacity-Compatible/dp/B07S829LBX/ref=sr_1_4?crid=1A9378Y50Y1TX&keywords=battery%2Bpacks%2Banker&qid=1690219592&sprefix=battery%2Bpacks%2Banker%2Caps%2C107&sr=8-4&th=1"
const cssSelector = "#attach-base-product-price";
console.log("hi!");

utils.getContents(url, cssSelector);

