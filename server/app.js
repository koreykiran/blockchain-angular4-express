// Get dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const initializePassport = require("./routes/auth/passport");
const viewEngine = require("./config/view-engine");//gives the default export in the view-engine.js
//enable Access-* headers from different domain
const cors = require("cors");
//parse the cookie header values
//set the cookies in req.cookies
const cookieParser = require("cookie-parser");

// Get our API routes
const api = require('./routes/api');
const login = require('./routes/auth/login');
const song = require('./routes/song/song');
const app = express();

app.models = require('./models/index');

//used for session 
require("./config/session") (app);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

viewEngine(app);

app.use(cors());
// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));
app.use("/vendor", express.static("node_modules"));


initializePassport(app);
app.use('/login', login);
app.use('/song', song);

// Set our api routes
app.use('/api', api);



// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//default export
//only one default export per file
module.exports=app