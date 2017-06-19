// grab the things we need
//var mongoose = require('mongoose');
const mongoose=require('../config/db');
var Artist=require('./Artist');
var Schema = mongoose.Schema;


// create a schema
var songSchema = new Schema({
  name: String,
  imgPath:String,
  artists:[{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Song = mongoose.model('Song', songSchema);

// make this available to our users in our Node applications
module.exports = Song;