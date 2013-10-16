'use strict';


/* App module
 * ========================================= */

var ngMeme = angular.module('ngMeme', [])

ngMeme.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
      templateUrl: 'partials/root.html',
      controller: rootController
    });
    $routeProvider.when('/img:params', {
      templateUrl: 'partials/image.html',
      controller: imageController
    });
    $routeProvider.otherwise({
      redirectTo: '/'
    });
  }]);


/* End App module */




/* Controllers
 * ========================================= */

function mainController($scope, $route, $routeParams, $location, MemeData){
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
  $scope.docRoot = window.location.origin + '/meme/#/';

  $scope.memeAreaHeight = function(chromeHeight){
    var windowHeight = window.innerHeight;
    var areaHeight = (windowHeight - chromeHeight) + 'px';
    return {'height' : areaHeight};
  }

  $scope.utf8ToBase64 = function(str){
    return window.btoa(unescape(encodeURIComponent(str))).replace(/=+$/, '');
  }
  $scope.b64ToUtf8 = function(str){
    return decodeURIComponent(escape(window.atob(str)));
  }
}

function rootController($scope, $route, $routeParams, $location, MemeData){
  $scope.createLink = function(){
    $scope.lincoln = $scope.docRoot + 'img?url=' + $scope.utf8ToBase64($scope.imageUrl) + '&fl=' + $scope.utf8ToBase64($scope.firstLine) + '&sl=' + $scope.utf8ToBase64($scope.secondLine);
    setTimeout(function(){
      document.querySelector('.share-field input').select();
    }, 100);
  };

  var memeData = MemeData.getMemeData();
  $scope.imageUrl = memeData.imageUrl;
  $scope.firstLine = memeData.firstLine;
  $scope.secondLine = memeData.secondLine;

  $scope.autoSelect = function($event){
    $event.currentTarget.setSelectionRange(0,7777777);
  }

  $scope.frameStyle = {
    'width' : 'auto'
  };
}

function imageController($scope, $route, $routeParams, $location, MemeData){
  $scope.imageUrl = $scope.b64ToUtf8($routeParams.url);
  $scope.firstLine = $scope.b64ToUtf8($routeParams.fl);
  $scope.secondLine = $scope.b64ToUtf8($routeParams.sl);

  var memeData = {
    'imageUrl' : $scope.imageUrl,
    'firstLine' : $scope.firstLine,
    'secondLine' : $scope.secondLine
  };

  MemeData.setMemeData(memeData)
}

/* End Controllers */




/* Directives
 * ========================================= */

ngMeme.directive('cradle', function(){
  return function(scope, element, attrs){
    element.bind('load', function(e){
      var width = element[0].width;
      var ems = width / 677;
      scope.$apply(function(scope){
        scope.frameStyle = {
          'width' : width + 'px',
          'font-size' : ems + 'em'
        };
      });
    });
  }
});

/* End Directives */




/* Filters
 * ========================================= */

/* End Filters */




/* Services
 * ========================================= */

ngMeme.factory('MemeData', function(){
  var memeData = {
    'imageUrl' : '',
    'firstLine' : '',
    'secondLine' : ''
  };

  return {
    getMemeData : function(){
      return memeData;
    },
    setMemeData : function(data){
      memeData = data;
    }
  }
})

/* End Services */




/* x
 * ========================================= */

/* End x */
