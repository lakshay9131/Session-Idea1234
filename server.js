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

//mongo.insert({ mak: 'col' }, 3)
//find on
console.log(mongo.result)
    //{ _id: new ObjectId("624947703b680c197e509938"), mak: 'cool' }
    //null


const uri = "mongodb+srv://mongodbtrial:mongodbtrial@cluster0.mzf3e.mongodb.net/db01?retryWrites=true&w=majority";

const session = require("express-session")

const MongoStore = require('connect-mongo');
//const connectStore = require('connect-mongo')
//const MongoStore = connectStore(session);

//name: "sess1",secret: "sess1",saveUninitialized: false,resave: false,
app.use(session({
    secret: 'SECRET KEY',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: uri,
        collectionName: "session",
        ttl: 3,
        autoRemove: 'native'
    }),
    cookie: {
        maxAge: 60 * 1000
    }
}));
console.log(session)
const port = process.env.PORT || 3000
app.listen(port, () => {


    console.log("3000")
})
app.get('/', (req, res, next) => {
    const b = {
        uuid: '12234-2345-27662h'
    }
    console.log(req.session.id)
    req.session.save();
    res.send(req.session.id + "<br><a href='/login'>login</ar><br><a href='/signup'>Signup</a>" + `  <h3> See all  user list on  <a>example.com or localhost </a></h3>
    <h4>Try this login session new will be created , if sucess login else would have to sign up</h4>
    <h4>Note - Password is not verified now its trial prototype just for session understanding</h4>
    <h4> We will use this session id to success verify and share confidential</h4>`)


    console.log(req.session.id);









});

app.get("/login", (req, res) => {
    const y = req.session.id
    const b = `<div  style='text-align:center'><h3>login session id == ` + y + `</h3><input type="text" id="userid" placeholder="login">
    <input type="text" id="pass" placeholder="pass">
    <button onclick="redirect()">Submit</button>

    <h3> See all  user list on  <a>example.com or localhost </a></h3>
    <h4>Try this login session new will be created , if sucess login else would have to sign up</h4>
    <h4>Note - Password is not verified now its trial prototype just for session understanding</h4>
    <h4> We will use this session id to success verify and share confidential</h4>
    <script>
        function redirect() {
            var u = document.getElementById("userid").value;
            var p = document.getElementById("pass").value;
            window.location = window.location + "/" + u + "/" + p;
        }
    </script>
    
    
    
    </div>`
    mongo.insertcall({}, 3, function(r) {
        res.send("<h3>USERS-:" + JSON.stringify(r) + "</h3><br><br>" + b)

    })



})
app.get("/login/:id/:p", (req, res) => {
    var id = req.params.id
    var p = req.params.p
    var i = { make: id }
    mongo.insertcall(i, 4, function(r) {
        console.log(r)


        if (r === null) {
            console.log(" null")
            res.send(" No user kindly signup  your session id-: " + req.session.id + id + "  " + p + "<br><a href='/login'>login</ar><br><a href='/signup'>Signup</a>" + `  <h3> See all  user list on  <a>example.com or localhost </a></h3>
            <h4>Try this login session new will be created , if sucess login else would have to sign up</h4>
            <h4>Note - Password is not verified now its trial prototype just for session understanding</h4>
            <h4> We will use this session id to success verify and share confidential</h4>`);
        } else {
            req.session.regenerate((err) => {
                console.log(req.session.id);
                req.session.save();
                res.send(" Welcome new login Saving this session with new session id==" + req.session.id + "  ||userid== " + id + "   " + p + "(expires in 5 /custom  min)<br><a href='/login'>login</ar><br><a href='/signup'>Signup</a>" + `  <h3> See all  user list on  <a>example.com or localhost </a></h3>
                <h4>Try this login session new will be created , if sucess login else would have to sign up</h4>
                <h4>Note - Password is not verified now its trial prototype just for session understanding</h4>
                <h4> We will use this session id to success verify and share confidential</h4>`);

            });
        }




    })


    //if password matches then regenerate and save for 1 min


});
app.get("/signup", (req, res) => {
    const y = req.session.id
    const b = `<div  style='text-align:center'><h3>Signup session id==` + y + `</h3><input type="text" id="userid" placeholder="login">
    <input type="text" id="pass" placeholder="pass">
    <button onclick="redirect()">Submit</button>
    <script>
        function redirect() {
            var u = document.getElementById("userid").value;
            var p = document.getElementById("pass").value;
            window.location = window.location + "/" + u + "/" + p;
        }
    </script>
    
    
    
    </div><a href='/login'>login</ar><br><a href='/signup'>Signup</a>  <h3> See all  user list on  <a>example.com or localhost </a></h3>
    <h4>Try this login session new will be created , if sucess login else would have to sign up</h4>
    <h4>Note - Password is not verified now its trial prototype just for session understanding</h4>
    <h4> We will use this session id to success verify and share confidential</h4>`

    res.send(b)
})
app.get("/signup/:id/:p", async(req, res) => {
    var id = req.params.id
    var p = req.params.p
    var i = { make: id }
    var mong = require("./mongo")
    mong.insertcall(i, 4, function(r) {
        console.log("result insertcall" + r)
        console.log(r)
        if (r === null) {
            console.log("not null")
            mong.insertcall(i, 1, function(r) {
                console.log("inserting" + r)
                res.send("Saving this session with id-: " + id + "  " + p + "<br>" + JSON.stringify(mong.result) + "<br><br><br>go to login again  " + `  <h3> See all  user list on  <a>example.com or localhost </a></h3>
                <h4>Try this login session new will be created , if sucess login else would have to sign up</h4>
                <h4>Note - Password is not verified now its trial prototype just for session understanding</h4>
                <h4> We will use this session id to success verify and share confidential</h4>`);



            })


        } else {
            res.send("Already account with  " + id + "  " + p + "<br>" + JSON.stringify(mong.result) + "<br><a href='/login'>login</ar><br><a href='/signup'>Signup</a>" + `  <h3> See all  user list on  <a>example.com or localhost </a></h3>
            <h4>Try this login session new will be created , if sucess login else would have to sign up</h4>
            <h4>Note - Password is not verified now its trial prototype just for session understanding</h4>
            <h4> We will use this session id to success verify and share confidential</h4>`);
        }

        //res.send("Saving this session with " + id + "  " + p + "<br>" + JSON.stringify(mong.result));


    })


});