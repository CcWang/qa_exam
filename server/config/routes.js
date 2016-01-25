
var meanController = require('./../controllers/meanController.js');

module.exports = function(app){
  app.get('/get_questions', function (req, res){
    meanController.get_questions(req,res);
  })
  app.get('/get_all_answers', function (req, res){
    meanController.get_all_answers(req,res);
  })
  app.post('/question/new', function (req, res){
    meanController.create_question(req,res);
  })

  app.post('/question/:info',function (req,res){
    meanController.one_question(req,res);
  })
  app.post('/answer/new', function(req,res){
  	meanController.create_answer(req,res);
  })
  app.post('/answer/:info',function(req,res){
    meanController.get_answers(req,res);
  })
  app.post('/answer/update/:_id',function(req,res){
    meanController.update_answer(req,res);
  })

}