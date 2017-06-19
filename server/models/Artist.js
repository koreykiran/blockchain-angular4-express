// grab the things we need
//var mongoose = require('mongoose');
const mongoose=require('../config/db');
var Schema = mongoose.Schema;

// create a schema
var artistSchema = new Schema({
  name: String,
  acctId:String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Artist = mongoose.model('Artist', artistSchema);

// make this available to our users in our Node applications
module.exports = Artist;