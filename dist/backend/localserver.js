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
            utils_1.default.updateAmazonItem(newItem);
            res.send({ success: true, response: newItem });
        }
        utils_1.default.saveAmazonItems();
    });
    app.post("/addUser", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addUser'`);
        const username = req.body.username;
        const password = req.body.password;
        const reason = { reason: "User already exists in the database!" };
        if (utils_1.default.findUser(username)) {
            const validUser = utils_1.default.findUser(username, password);
            if (validUser)
                res.send({ success: true, response: validUser });
            else
                res.send({ success: false, response: reason });
        }
        else {
            const newUser = new userdata_1.UserData(username, password);
            utils_1.default.addUser(newUser);
            res.send({ success: true, response: newUser });
        }
        utils_1.default.saveUsers();
    });
    app.post("/addItemToUser", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addItemToUser'`);
        const username = req.body.username;
        const password = req.body.password;
        const url = req.body.productURL;
        const reason1 = { reason: "Invalid User!" };
        const reason2 = { reason: "Invalid Item!" };
        const foundUser = utils_1.default.findUser(username, password);
        const foundItem = utils_1.default.findAmazonItem(url);
        console.log(foundItem);
        if (foundUser) {
            if (foundItem) {
                foundUser.items.push(foundItem);
                res.send({ success: true, response: { user: foundUser } });
            }
            else {
                utils_1.default.fetchAmazonItemFromSite(url)
                    .then(fetchedItem => {
                    utils_1.default.addAmazonItem(fetchedItem);
                    foundUser.items.push(fetchedItem);
                    res.send({ success: true, response: { user: foundUser } });
                }).catch(rej => {
                    res.send({ success: false, response: reason2 });
                });
            }
        }
        else {
            res.send({ success: false, response: reason1 });
        }
        utils_1.default.saveUsers();
        utils_1.default.saveAmazonItems();
    });
    app.get("/getItemsFromUser", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/getTable'`);
        const username = req.body.username;
        const password = req.body.password;
        const reason = { reason: "Invalid user!" };
        const foundUser = utils_1.default.findUser(username, password);
        if (foundUser) {
            res.send({ success: true, response: foundUser.items });
        }
        else {
            res.send({ success: false, response: reason });
        }
    });
    app.post("/findItem", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/findItem'`);
        const url = req.body.productURL;
        utils_1.default.getSpecificContents(url, "#tp_price_block_total_price_ww > .a-offscreen:first").then((price) => {
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