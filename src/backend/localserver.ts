import express from "express";
import cors from "cors";

import utils, { userData } from "./common/utils";
import { UserData } from "./common/structures/classes/userdata";
import { AmazonItem } from "./common/structures/classes/amazonitem";


const PORT = 3000;
const app = express();

const localserver = {
    start: function() {},
}

localserver.start = () => {
    app.use(cors());
    app.use(express.json());


    app.get("/", (req, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/'`)
        res.send("Hello other person!");
    });


    app.post("/addItem", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addItem'`)
        const name = req.body.name;
        const url = req.body.url;

        if(utils.findAmazonItem(name)) {
            const reason = { reason: "Item already exists in the database!" }
            res.send({success: false, response: reason})
        } else {
            const newItem = new AmazonItem(name, url);
            utils.addAmazonItem(newItem);
            utils.updateAmazonItem(newItem);
            utils.saveAmazonItems();
            res.send({success: true, response: newItem});
        }
    });


    app.post("/addUser", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addUser'`)
        const username = req.body.username;
        const password = req.body.password;
        const reason = { reason: "User already exists in the database!" }

        if(utils.findUser(username)) {
            res.send({success: false, response: reason})
        } else {
            const newUser = new UserData(username, password);
            utils.addUser(newUser);
            utils.saveUsers()
            res.send({success: true, response: newUser});
        }
    });


    app.post("/addItemToUser", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addUserToUser'`)
        const username = req.body.username;
        const password = req.body.password;
        const item = req.body.productURL;
        const reason1 = { reason: "Invalid User!" };
        const reason2 = { reason: "Invalid Item!" };
        const foundUser = utils.findUser(username);
        const foundItem = utils.findAmazonItem(item);


        if(foundUser) {
            if(foundItem) {
                foundUser.items.push(foundItem)
                res.send({success: true, response: {foundUser, foundItem}});
            } else {
                utils.findAmazonItem(item)
            }
        } else {
            const newUser = new UserData(username, password);
            utils.addUser(newUser);
            utils.saveUsers()
            res.send({success: true, response: newUser});
        }
    });


    app.get("/getItemsFromUser", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/getTable'`)
        const username = req.body.username;
        const password = req.body.password;
        const reason = { reason: "Invalid user!" };
        const foundUser = utils.findUser(username, password);

        if(foundUser) {
            res.send({success: true, response: foundUser.items})
        } else {
            res.send({success: false, response: reason})
        }
    });


    app.post("/findItem", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/findItem'`)
        const url = req.body.productURL;
        utils.getSpecificContents(url, "#tp_price_block_total_price_ww > .a-offscreen:first").then((price: any) => {
            console.log(`Sending price of ${price}...`);
            res.send(price);
        })
    });


    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`)
    });
}

export = localserver;