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

        if(utils.findItem(name)) {
            res.send({success: false})
        } else {
            const newItem = new AmazonItem(name, url);
            utils.addItem(newItem);
            res.send({success: true, response: newItem});
        }
    });

    app.post("/addUser", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/addUser'`)
        const username = req.body.username;
        const password = req.body.password;

        if(utils.findUser(username)) {
            res.send({success: false})
        } else {
            const newUser = new UserData(username, password);
            utils.addUser(newUser);
            res.send({success: true, response: newUser});
        }
    });

    app.get("/getTable", (req: any, res) => {

    });


    app.post("/findItem", (req: any, res) => {
        console.log(`${req.method} METHOD REQUEST AT '/findItem'`)
        const url = req.body.productURL;
        utils.getContents(url, "#tp_price_block_total_price_ww > .a-offscreen:first").then((price: any) => {
            console.log(`Sending price of ${price}...`);
            res.send(price);
        })
    });


    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`)
    });
}

export = localserver;