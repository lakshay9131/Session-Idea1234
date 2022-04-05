var express = require("express")

var app = express()
const fs = require('fs');
const path = require('path');
const toobusy = require('toobusy-js');
const mongo = require("./mongo")
app.use(function(req, res, next) {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
        next();
    }
});
const helmet = require("helmet");
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
    })
);
const process = require("process")
process.on("uncaughtException", function(err) {
    console.log(err)

    // clean up allocated resources
    // log necessary error details to log files
    process.exit(); // exit the process to avoid unknown state
});

const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
        windowMs: 1.3 * 60 * 1000, // 1.2 minutes
        max: 4, // Limit each IP to max this requests per `window` (here, per 1.2 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message: "try again after few minutes later"
    })
    //app.use('/pre', apiLimiter)
app.use(express.json({ limit: "1kb" }));
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
//mongo.insert({}, 1)
//mongo.insert([{},{}], 2)
//mongo.insert({}, 3) find all
//mongo.insert({query:jj}, 4)//find one

mongo.insert({ mak: 'col' }, 3)
    //find on
console.log(mongo.result)
    //{ _id: new ObjectId("624947703b680c197e509938"), mak: 'cool' }
    //null