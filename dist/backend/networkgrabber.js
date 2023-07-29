"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./common/utils"));
const networkgrabber = {
    getPrice: function (url, cssSelector) { },
};
networkgrabber.getPrice = (url, cssSelector) => {
    const item = utils_1.default.getContents(url, cssSelector);
    const price = item.attr("value");
};
//# sourceMappingURL=networkgrabber.js.map