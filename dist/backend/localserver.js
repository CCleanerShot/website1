"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = __importDefault(require("./common/utils"));
const PORT = 3000;
const app = (0, express_1.default)();
const localserver = {
    start: function () { },
};
localserver.start = () => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        console.log(req.method);
        res.send("Hello other person!");
    });
    app.post("/findItem", (req, res) => {
        console.log("Someone has requested item!");
        const url = req.body.productURL;
        utils_1.default.getContents(url, "#tp_price_block_total_price_ww > .a-offscreen:first").then((price, rej) => {
            console.log(`Sending price of ${price}...`);
            res.send(price);
        });
    });
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`);
    });
};
module.exports = localserver;
//# sourceMappingURL=localserver.js.map