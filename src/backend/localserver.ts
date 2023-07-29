import express from "express";

const PORT = 3000;
const app = express();

const localserver = {
    start: function() {},
}

localserver.start = () => {
    app.get("/", (req, res) => {
        console.log(req.method);
        
        res.send("Hello other person!");
    });

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}.`)
    });
}

export = localserver