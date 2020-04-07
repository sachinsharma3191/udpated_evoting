const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');
const cors = require("cors");

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//DB
console.log("Creation Mysql Connection");
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sachin@123',
    database: 'Evoting'
});

console.log("Connecting to db");
db.connect(function(err){
    if(err)
    {
        console.log('DB error');
        throw err;
        return false;
    }
    console.log("Connection to db established");
});

const sessionStore = new MySQLStore({
    expiration : (1825 * 86400 * 1000),
    endConnectionOnClose : false
}, db);

app.use(session({
    key: 'aghd8weoyqdy98wd92ehoqw',
    secret: '7tdkaut39diqwtdq',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie:  {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));
app.use(bodyParser.json());

new Router(app,db);
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
})

const port = 3002;
console.log("Server started on port" + port);
app.listen(port);

