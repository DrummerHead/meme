'use strict';

var ngMeme = angular.module('ngMeme', [])

ngMeme.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/', {
      templateUrl: '/partials/root.html',
      controller: rootController
    });
    $routeProvider.when('/:img', {
      templateUrl: '/partials/image.html',
      controller: imageController
    });
    $routeProvider.otherwise({ // Quite useless, I'll leave it for reference
      redirectTo: '/'
    });
  }]);

ngMeme.factory('Toma', function(){
  var memeData = {};

  return {
    getMemeData : function(){
      console.log(memeData);
      return memeData;
    },
    setMemeData : function(data){
      memeData = data;
      console.log(memeData);
    }
  }
})

var localhost = true;
var docRoot = (localhost ? 'http://localhost:8080/#/' : 'http://mcdlr.com/lalalele')

function urlfy(input){
  return input.replace(/ /g, '-');
}


function mainController($scope, $route, $routeParams, $location, Toma){
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;

  $scope.memeAreaHeight = function (){
    var windowHeight = window.innerHeight;
    var memeChrome = 108;
    var areaHeight = (windowHeight - memeChrome) + 'px';
    console.log(areaHeight);
    return {'height' : areaHeight};
  }
}

function rootController($scope, $route, $routeParams, $location, Toma){
  $scope.createLink = function(){
    $scope.lincoln = docRoot + 'img?url=' + encodeURIComponent($scope.imageUrl) + '&fl=' + encodeURIComponent($scope.firstLine) + '&sl=' + encodeURIComponent($scope.secondLine)
  };
  var lasCosas = Toma.getMemeData();

  $scope.imageUrl = lasCosas.imageUrl;
  $scope.firstLine = lasCosas.firstLine;
  $scope.secondLine = lasCosas.secondLine;

}

function imageController($scope, $route, $routeParams, $location, Toma){
  //$scope.sicodelia = Toma.getCoso();
  $scope.imageUrl = $routeParams.url;
  $scope.firstLine = $routeParams.fl;
  $scope.secondLine = $routeParams.sl;

  var dataMagica = {
    'imageUrl' : $routeParams.url,
    'firstLine' : $routeParams.fl,
    'secondLine' : $routeParams.sl
  };

  Toma.setMemeData(dataMagica)
}

function Memize($scope){
  $scope.createLink = function(){
    console.log('does');
    console.log($scope.imageUrl + ' ' + $scope.firstLine + ' ' + $scope.secondLine);
  };
}


/* Stuff that I don't really know how to... angularize or summin...
 * pls help */







