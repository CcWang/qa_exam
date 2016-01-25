var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
  question:String,
  description:String,
  created:{type: Date, default: new Date}
})

mongoose.model('Question', questionSchema);