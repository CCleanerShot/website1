"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = __importDefault(require("./common/utils"));
const userdata_1 = require("./common/structures/classes/userdata");
const amazonitem_1 = require("./common/structures/classes/amazonitem");
const PORT = 3000;
const app = (0, express_1.default)();
const localserver = {
    start: function () { },
};
localserver.start = () => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.get("/", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/'`);
        res.send("Hello other person!");
    });
    app.post("/addItem", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addItem'`);
        const name = req.body.name;
        const url = req.body.url;
        if (utils_1.default.findAmazonItem(name)) {
            const reason = { reason: "Item already exists in the database!" };
            res.send({ success: false, response: reason });
        }
        else {
            const newItem = new amazonitem_1.AmazonItem(name, url);
            utils_1.default.addAmazonItem(newItem);
            utils_1.default.saveAmazonItems();
            res.send({ success: true, response: newItem });
        }
    });
    app.post("/addUser", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addUser'`);
        const username = req.body.username;
        const password = req.body.password;
        const reason = { reason: "User already exists in the database!" };
        if (utils_1.default.findUser(username)) {
            const reason = { reason: "User already exists in the database!" };
            res.send({ success: false, response: reason });
        }
        else {
            const newUser = new userdata_1.UserData(username, password);
            utils_1.default.addUser(newUser);
            utils_1.default.saveUsers();
            res.send({ success: true, response: newUser });
        }
    });
    app.get("/getTable", (req, res) => {
    });
    app.post("/findItem", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/findItem'`);
        const url = req.body.productURL;
        utils_1.default.getContents(url, "#tp_price_block_total_price_ww > .a-offscreen:first").then((price) => {
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