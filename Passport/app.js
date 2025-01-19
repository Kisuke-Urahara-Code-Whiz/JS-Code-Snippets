require('dotenv').config();
const express = require("express");
var session = require('express-session');
var passport = require('passport');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
const db = require('./db');

const app = express();

app.set("view engine","ejs");

const path = require("path");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Add passport serialization
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, name: user.name });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

let port = 3000;

db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log("server online");
    });
  })
  .catch(err => {
    console.error('Error connecting to the database', err);
  });

app.use('/', indexRouter);
app.use('/', authRouter);