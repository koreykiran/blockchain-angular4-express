const express = require('express');
const passport = require("passport");
const router = express.Router();
const models = require("../../models/index");
var User= models.user;
var Song=models.song;

// declare axios for making http requests
router.get('/all', function (req, res) {
  Song.find().then(function(data){
      data.forEach(function(element) {
          console.log("Data found", element);
      }, this);
    res.json(data);
  },function(err){
console.log("Cannot fetch song",err);
    res.sendStatus(500);
  });
});


module.exports = router;
