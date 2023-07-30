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
utils_1.default.saveUsers();
setTimeout(() => {
    console.log(utils_1.default.configData);
    console.log(utils_1.default.itemData);
    console.log(utils_1.default.userData);
    console.log(utils_1.default.userData[0]);
    utils_1.default.saveConfig();
    utils_1.default.saveAmazonItems();
    utils_1.default.saveUsers();
}, 5000);
localserver_1.default.start();
//# sourceMappingURL=index.js.map