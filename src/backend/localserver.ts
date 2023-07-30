import express from "express";
import cors from "cors";

import utils from "./common/utils";

const PORT = 3000;
const app = express();

const localserver = {
    start: function() {},
}

localserver.start = () => {
    app.use(cors());
    app.use(express.json());

    app.get("/", (req, res) => {
        console.log(req.method);
        
        res.send("Hello other person!");
    });

    app.post("/findItem", (req: any, res) => {
        console.log("Someone has requested item!");
        const url = req.body.productURL;
        utils.getContents(url, "#tp_price_block_total_price_ww > .a-offscreen:first").then((price: any, rej: any) => {
            console.log(`Sending price of ${price}...`)
            res.send(price)
        })

    })
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`)
    })
}

export = localserver;