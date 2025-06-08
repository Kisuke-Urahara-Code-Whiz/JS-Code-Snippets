const express = require("express");

const app = express();

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

const path = require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

let port = 3000;

app.listen(port,()=>{
    console.log("server online");
})
