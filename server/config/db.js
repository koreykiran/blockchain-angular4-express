const mongoose = require('mongoose');


const config=require("./config");

var url=`mongodb://${ config.db.host}:${config.db.port}/${ config.db.database}`;
console.log(url);
mongoose.Promise = global.Promise;
mongoose.connect(url);

module.exports=mongoose;
