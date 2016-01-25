myApp.controller('HomeController', function($scope,MainFactory){
  $scope._user;
  var user;
  console.log(MainFactory.user);

  $scope.logout = function(){
    user ='';
    $scope._user ={"user":user};
    MainFactory.user = $scope._user;
    // $scope._user = $scope.user;
  };

  var counter = 2;
  $scope.qCounter = {};
  //get all the answers and questions, create a mapObject, use question id as key, value is the amount of that question's answer
  //then give questions each value a new key'counter', set value as mapObejct's each value.
  var mapQ_A =function(questions,answers){
    if (MainFactory.user == undefined ) {

      user = prompt('please enter your name');
    };
    $scope._user ={"user":user};
    MainFactory.user = $scope._user;
    for(var i=0; i<questions.length;i++){
      
      $scope.qCounter[questions[i]._id] = 0;
    };
    for(var a in answers){
     for(var q_id in $scope.qCounter){
      if(q_id == answers[a]._question){
        $scope.qCounter[q_id] ++;
      };
     };
    };
    for(var q in questions){
      for(var q_id in $scope.qCounter){
        if (q_id == questions[q]._id) {
          questions[q]['counter'] = $scope.qCounter[q_id];
        };
      };
    };
  };
  var _updateQ = function(data){
    $scope.questions = data;
    counter --;
    if(counter == 0 ){
      mapQ_A($scope.questions,$scope.answers);
      // console.log($scope.questions);
    }
  };

  var _updateA = function(data){
    $scope.answers = data;
    counter --;
    if(counter == 0 ){
      mapQ_A($scope.questions,$scope.answers);
      // console.log($scope.questions);
    }
  };
  MainFactory.indexQ (_updateQ);
  MainFactory.indexA (_updateA);

});

myApp.controller('NewQuestionController', function($scope, MainFactory, QuestionFactory){
  
  $scope.cancel = function(){
    $scope.new_question = {};
  }
  $scope.create = function(){
    //check validation
    if($scope.new_question.q.length < 10){
      $scope.message ={message: 'Question should be at least 10 characters long.'};
    }else{
      QuestionFactory.create(
        $scope.new_question,
        function(data){
          $scope.message = data;
        }
      );
      $scope.new_question = {};
    }
  }
});
myApp.controller('AddAnswerController', function($scope, MainFactory, AnswerFactory,$routeParams,$location){
  $scope.new_answer= MainFactory.user;
  // $scope.question;
  AnswerFactory.findOne(
    $routeParams._id, 
    function(data){
      $scope.question =data;
    }
  );
  $scope.cancel = function(){
    $scope.new_answer.answer = '';
    $scope.new_answer.details = '';
    $scope.new_answer= MainFactory.user;
  }
  $scope.create = function(){
    //check validation
    if($scope.new_answer.answer.length < 6){
      $scope.message ={message: 'Answer should be at least 5 characters long.'};
    }else{
      $scope.new_answer.q_id = $routeParams._id;
      AnswerFactory.create($scope.new_answer, function(data) {
        console.log($scope.new_answer);
        $location.path('/question/'+data._question);
      });
    };
    // $scope.new_answer.answer = '';
    // $scope.new_answer.details = '';
  };
  
});
myApp.controller('AnswerController', function($scope, AnswerFactory,$routeParams){
  // console.log($routeParams.id);
  var _update = function(data){
    $scope.answers = data;
  }
  AnswerFactory.findOne(
    $routeParams.id,
    function(data){
      $scope.question =data;
    }
  );
  AnswerFactory.index(
    $routeParams.id,
    _update
  );
  $scope.like = function(answer){
    // console.log(answer._id);
    AnswerFactory.updateAnswer(
      answer._id,
      answer,
      _update
    );

  }
})


















