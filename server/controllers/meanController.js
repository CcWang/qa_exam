var mongoose = require('mongoose');


var Question =mongoose.model('Question');
var Answer = mongoose.model('Answer');


module.exports = {
  create_question:function (req,res) {
    var new_question = new Question({question: req.body.q,  
                                  description:req.body.des,answers:0});
    new_question.save(function (err, data){
      if(err){
        console.log('DB cannot save new_product');
      }else{
        res.json({message:'Successfully submit a new question!'});
      };
    })
  },
  get_questions: function (req,res){
    Question.find({}, function(err,data){
      if(err){
        console.log('db cannot find products');
      }else{
        res.json(data);
      };
    })
  },
  one_question: function (req,res){
    console.log(req.params.info);
    Question.findOne({_id:req.params.info}, function (err, data){
      if(err){
        console.log('db cannot delete');
      }else{
        res.json(data);
      }
    })
  },
  create_answer:function (req,res){
    // console.log(req.body);
    Question.findOne({_id:req.body.q_id}, function (err, question){
      if(err){
        console.log('db cannot find question');
      }else{
        var new_answer = new Answer({name:req.body.user, answer:req.body.answer, details: req.body.details,like:0});
        new_answer._question = question._id;
        new_answer.save(function(err,data){
          if (err) {
            console.log('db cannot save new answer');
          }else{
            // console.log('Successfully save new answer');
            // console.log('after create a new_answer:'+ data)
            res.json(data);
          };
        });
      };
    });
  },
  get_answers: function (req,res){
    Answer.find({_question:req.params.info}, function(err, answers){
      if (err) {
        console.log('db wrong');
      }else{
        // console.log(answers);
        res.json(answers);
      };
    })
  },
  get_all_answers: function(req,res){
   Answer.find({}, function(err, answers){
      if (err) {
        console.log('db wrong');
      }else{
        res.json(answers);
      };
    })
  },
  update_answer: function(req,res){
    console.log(req.params._id);
    // console.log(req.body.like);
    Answer.update({_id: req.params._id},{$set:{like: req.body.like+1}}, function(err, answer){
      if(err){
        console.log('db wrong');
      }else{
        
        Answer.find({_question: req.body._question},function(err, answers){
          // console.log(req.body._question);
          if (err) {
            console.log('db wrong');
          }else{
            // console.log('after updata'+answers);
            res.json(answers);
          };
        })
      };
    })
  }
};