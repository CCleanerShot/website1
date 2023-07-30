"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./common/utils"));
const localserver_1 = __importDefault(require("./localserver"));
utils_1.default.configData = utils_1.default.loadConfig();
utils_1.default.itemData = utils_1.default.loadAmazonItems();
utils_1.default.userData = utils_1.default.loadUsers();
localserver_1.default.start();
const launch = Date.now();
setTimeout(() => console.log(Date.now() - launch), 5000);
//# sourceMappingURL=index.js.map