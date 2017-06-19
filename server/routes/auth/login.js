const express = require('express');
const passport = require("passport");
const router = express.Router();
const models = require("../../models/index");
const helper= require("./helper");
var User= models.user;

// declare axios for making http requests
router.get('/', function (req, res) {
  res.render('login', { title: 'Login'})
});
            
router.post('/',
            //calls strategy
            //passport.use method will be called
            passport.authenticate('local',{failureRedirect:'/login'}),
            function(req,res){
                
                console.log("post called",req.body);
                //console.log("after success",this.local.user);
                //if(req.body.username=='admin'&& req.body.password=='admin'){
                    res.redirect("/");
});

router.get('/register', function (req, res) {
  res.render('register', { title: 'Login'})
});

router.post('/register', function (req, res) {
    var body = req.body;
    console.log("in register post method",body);
    if(body.password!=body.confirmPassword){
        res.render("register",{message:"Passwords did not match",name:body.name,username:body.username});      
    }
    var user=new User();
    user.name=body.name;
    user.username=body.username;
    user.password=body.password;
    user.salt=helper.genRandomString(8);
    user.hash=helper.encodePassword(body.password,user.salt);
    user.created_at=Date.now();
    user.roles=['admin','customer','creator'];

    user.save().then(function(data,err){
        if(err){
            res.render("register",{message:err,name:body.name,username:body.username});      
        }
        
    });

  res.render("login",{message:"Registered successfully Please login to Authenticate!"});
});
module.exports = router;
