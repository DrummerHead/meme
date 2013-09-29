angular.module('ngMeme', [], function($routeProvider, $locationProvider){
  $routeProvider.when('/', {
    templateUrl: 'root.html',
    controller: rootController
  });
  $routeProvider.when('/:imgPath', {
    templateUrl: 'image.html',
    controller: imageController
  });
});



function mainController($scope, $route, $routeParams, $location){
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}

function rootController($scope, $route, $routeParams, $location){
  $scope.createLink = function(){
    console.log('does');
    console.log($scope.imageUrl + ' ' + $scope.firstLine + ' ' + $scope.secondLine);
  };
}

function imageController($scope, $route, $routeParams, $location){
}

function Memize($scope){
  $scope.createLink = function(){
    console.log('does');
    console.log($scope.imageUrl + ' ' + $scope.firstLine + ' ' + $scope.secondLine);
  };
}


