const express = require("express");

const router = express.Router();

router.get('/login', function(req, res, next) {
    res.render('login');
  });

router.get('/',(req,res)=>{
  res.render('home');
})

module.exports = router;