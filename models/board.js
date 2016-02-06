var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Board = new Schema({
  title:  String,
  partn: String,
});

module.exports = mongoose.model('Board', Board);