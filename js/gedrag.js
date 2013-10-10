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

function mainController($scope, $route, $routeParams, $location, Toma){
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

function rootController($scope, $route, $routeParams, $location, Toma){
  $scope.createLink = function(){
    $scope.lincoln = $scope.docRoot + 'img?url=' + $scope.utf8ToBase64($scope.imageUrl) + '&fl=' + $scope.utf8ToBase64($scope.firstLine) + '&sl=' + $scope.utf8ToBase64($scope.secondLine)
  };

  var lasCosas = Toma.getMemeData();

  $scope.imageUrl = lasCosas.imageUrl;
  $scope.firstLine = lasCosas.firstLine;
  $scope.secondLine = lasCosas.secondLine;

  $scope.autoSelect = function($event){
    $event.currentTarget.select();
  }

  $scope.imageWidth = {
    'width' : 'auto'
  };
}

function imageController($scope, $route, $routeParams, $location, Toma){
  $scope.imageUrl = $scope.b64ToUtf8($routeParams.url);
  $scope.firstLine = $scope.b64ToUtf8($routeParams.fl);
  $scope.secondLine = $scope.b64ToUtf8($routeParams.sl);

  var dataMagica = {
    'imageUrl' : $scope.imageUrl,
    'firstLine' : $scope.firstLine,
    'secondLine' : $scope.secondLine
  };

  Toma.setMemeData(dataMagica)
}

/* End Controllers */




/* Directives
 * ========================================= */

ngMeme.directive('cradle', function(){
  return function(scope, element, attrs){
    element.bind('load', function(e){
      scope.imageWidth = {
        'width' : element[0].width + 'px'
      };
      scope.$apply();
    });
  }
});

/* End Directives */




/* Filters
 * ========================================= */

/* End Filters */




/* Services
 * ========================================= */

ngMeme.factory('Toma', function(){
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
