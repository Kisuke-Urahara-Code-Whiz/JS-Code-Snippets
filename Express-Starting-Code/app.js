const express = require("express");

const app = express();
const methodOverride = require('method-override')

app.set("view engine","ejs");

const path = require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.use(express.json());

let port = 3000;

app.listen(port,()=>{
    console.log("server online");
})