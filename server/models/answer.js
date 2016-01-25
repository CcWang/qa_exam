var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  name:String,  
  answer:String,
  _question:{type:Schema.Types.ObjectId, ref:'Question'},
  details:String,
  created:{type: Date, default: new Date},
  like:Number
})

mongoose.model('Answer', answerSchema);