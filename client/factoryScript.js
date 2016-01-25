myApp.factory('MainFactory', function($http){
  var factory = {};
  factory.user;
  factory.get_user = function(user){
    factory.user = user;
  };
  factory.indexQ = function(cb){
    $http.get('/get_questions').success(
      function(data){
        cb(data);
      })
  };
  factory.indexA = function(cb){
    $http.get('/get_all_answers').success(cb);
  }

  // console.log(factory.user);
  return factory;
});
myApp.factory('QuestionFactory', function($http){
  var factory = {};
  factory.create = function(info,cb){
    $http.post('/question/new', info).success(
      function(data){
        cb(data);
      }
    );
  };
  return factory;
});
myApp.factory('AnswerFactory', function($http){
  var factory ={};
  factory.index = function(info,cb){
    $http.post('/answer/'+info).success(
      function(data){
        cb(data);
      });
  }
  factory.findOne = function(info, cb) {
    $http.post('/question/'+info).success(
      function(data){
        cb(data);
      });
  };
  factory.updateAnswer = function(_id,like,cb){
    console.log(_id);
    $http.post('/answer/update/'+_id,like).success(
      function(data){
        cb(data);
      }
    );
  }
  factory.create = function(new_a,cb){
    $http.post('/answer/new',new_a).success(
      function(data){
        cb(data);
      });
  };
  return factory;
})
