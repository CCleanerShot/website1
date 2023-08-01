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


    app.post("/addUser", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addUser'`)
        const username = req.body.username;
        const password = req.body.password;
        const reason = { reason: "User already exists in the database!" }
        if(utils.findUser(username)) {
            const validUser = utils.findUser(username, password);
            if(validUser)
                res.send({success: true, response: validUser});
            else
                res.send({success: false, response: reason});
        } else {
            const newUser = new UserData(username, password);
            utils.addUser(newUser);
            res.send({success: true, response: newUser});
        }

        utils.saveUsers();
    });


    app.post("/addItemToUser", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addItemToUser'`)
        const username = req.body.username;
        const password = req.body.password;
        const url = req.body.productURL;
        const reason1 = { reason: "Invalid User!" };
        const reason2 = { reason: "Invalid Item!" };
        const reason3 = { reason: "Missing a parameter!" };
        const foundUser = utils.findUser(username, password);
        const foundItem = utils.findAmazonItem(url);

        if(!username || !password || !url) {
            res.send({success: false, response: reason3});
            return;
        }

        if(!foundUser) {
            res.send({success: false, response: reason1});
            return;
        }

        if(foundItem) {
            foundUser.items.push(foundItem);
            res.send({success: true, response: {user: foundUser}});
        } else {
            utils.fetchAmazonItemFromSite(url)
            .then(fetchedItem => {
                utils.addAmazonItem(fetchedItem)
                foundUser.items.push(fetchedItem)
                res.send({success: true, response: {user: foundUser}});
            }).catch(rej => {
                res.send({success: false, response: reason2})
            })
        }

        utils.saveUsers();
        utils.saveAmazonItems();
    });


    app.post("/getItemsFromUser", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/getItemsFromUser'`)
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