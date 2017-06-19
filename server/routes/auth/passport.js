var passport = require('passport');
var passportLocal =  require('passport-local');

//var User = require("../models/User");
var helper = require("./helper");
//var models=require('../../models/index')
module.exports = function(app) {
    console.log("app passed to passport auth");
    app.use(passport.initialize());
    app.use(passport.session());
    User= app.models.user;

    //save to session
    passport.serializeUser(function(user, cb) {
            console.log("serializeUser")

            console.log("---->1",user.hash);
            delete user.hash;
            delete user.salt;
            console.log("---->1",user);
            cb(null, user);

            //cb(null, user.username);
        });


    //retrive from session
    //for every upcoming request post login
    passport.deserializeUser(function(user, cb) {
        console.log("deserializeUser")
        cb(null, user);
    });

        //Local strategy for authencation with 
        //local db, ,mysql, mongodb
        //custom authentication
        var Strategy = require('passport-local').Strategy;

        passport.use(new Strategy(
             //during user login, this function called
             function(username, password, cb) {

                console.log("In passport-local strategy",username, password);
                User.findOne({"username": username})
                .then(function(user){
                    //if user not present
                    if(!user){
                        console.log("User not found");
                        cb("user not found",null);
                    }else{
                    //user found
                    console.log("user found");

                    var hashedPassword = helper.encodePassword(password, user.salt);

                    //if db hash != user given password with db salt
                    if (user.hash != hashedPassword) {
                        console.log("password didn't match");
                        cb("password not matched", null);
                        return;
                    }else{
                         console.log("valid user");

                        //user shall be stored in the session
                        //by passport js
                         cb(null, user);
                    }
                }},
                function(err){
                cb("err : "+err, null);
                });

             })
            
        )
}
/*

        var GitHubStrategy = require('passport-github').Strategy;

        passport.use(new GitHubStrategy({
            clientID: "46e04bcf31b15c5f5c17",
            clientSecret: "e3f2362e2a4e044007eaa1fcaf195f4de89fd1c9",
            callbackURL: "http://localhost:8080/auth/github/callback"
        },
        function(accessToken, refreshToken, profile, cb) {
            console.log("profile ", profile);
            
            var user = {
                id:   profile.id,
                scheme: 'github'
            }
            return cb(null, user);
        }
        ));

        passport.serializeUser(function(user, cb) {
            console.log("serializeUser")
            cb(null, user);
            //cb(null, user.username);
        });

        passport.deserializeUser(function(user, cb) {
        console.log("deserializeUser")

       

        cb(null, user);

        });
}*/