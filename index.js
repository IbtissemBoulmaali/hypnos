const express = require('express'),
    bodyparser = require("body-parser"),
    config = require("./server/config/default.json"),
    port = process.env.PORT || config.port;


const app = express()



app.listen(port, () => {
    console.log("server tourne sur le port : ", port);
}
)
