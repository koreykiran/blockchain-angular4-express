var session = require("express-session");
const MongoStore = require('connect-mongo')(session);
module.exports=function(app){
    app.use(session({
        secret: 'nodeKiranKorey',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
        store: new MongoStore({ url: 'mongodb://localhost/sony-session-db' }) // stores the sessions in the db
    }));
}