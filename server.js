
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const mongoConnect = require('./config/db');
const redis = require('redis');

// const client = redis.createClient();

const router = require('./router');



const app = express();

let redisClient = redis.createClient({
    host: 'http://localhost/',
    port: 6379,
    legacyMode: true,
});
redisClient.connect()
redisClient.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err)
})
redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully  🛵 🚗")
})


let port = process.env.PORT || 1601;
global.app = app;
global.gredis = redisClient;
global.basePath = __dirname;





//logs here....
app.use(morgan('dev'));





app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})




// parsing data here....
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cookieParser())
app.use(bodyParser.json());




process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;




app.use('/', router);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
});





// listening to port here....
app.listen(port, function () {
    mongoConnect();
    console.log("listening on port 👨‍💻 ----->>", port)
})


