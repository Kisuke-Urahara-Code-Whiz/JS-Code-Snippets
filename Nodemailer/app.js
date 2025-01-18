const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const nodemailer = require("nodemailer");

app.set("view engine","ejs");

const path = require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

let port = 3000;

app.listen(port,()=>{
    console.log("server online");
})

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/",(req,res)=>{
    const auth = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth:{
            user: process.env.FROM_EMAIL,
            pass: process.env.PASSWORD
        }
    })
    
    const receiver ={
        from: process.env.FROM_EMAIL,
        to: process.env.TO_EMAIL,
        subject: "Nodemailer",
        html: `<div class="google-signin-container">
                <button class="google-signin-btn" id="googleSignInBtn">
                <img src="google.png" 
                    alt="Google Logo">
                Sign in with Google
                </button>
            </div>`
    };
    
    auth.sendMail(receiver,(error,emailResponse)=>{
        if(error)
            throw error;
        console.log("success");
        res.redirect("/");
    })
})
