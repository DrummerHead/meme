'use strict';

angular.module('ngMeme', [], function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    templateUrl: 'root.html',
    controller: rootController
  });
  $routeProvider.when('/:img', {
    templateUrl: 'image.html',
    controller: imageController
  });
  $routeProvider.otherwise({ // Quite useless, I'll leave it for reference
    redirectTo: '/'
  });
});

var localhost = true;
var docRoot = (localhost ? 'http://localhost:8080/#/' : 'http://mcdlr.com/lalalele')

function urlfy(input){
  return input.replace(/ /g, '-');
}


function mainController($scope, $route, $routeParams, $location){
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}

function rootController($scope, $route, $routeParams, $location){
  $scope.createLink = function(){
    $scope.lincoln = docRoot + 'img?url=' + encodeURIComponent($scope.imageUrl) + '&fl=' + encodeURIComponent($scope.firstLine) + '&sl=' + encodeURIComponent($scope.secondLine)
  };
}

function imageController($scope, $route, $routeParams, $location){
  $scope.imageUrl = $routeParams.url;
  $scope.firstLine = $routeParams.fl;
  $scope.secondLine = $routeParams.sl;
}

function Memize($scope){
  $scope.createLink = function(){
    console.log('does');
    console.log($scope.imageUrl + ' ' + $scope.firstLine + ' ' + $scope.secondLine);
  };
}


