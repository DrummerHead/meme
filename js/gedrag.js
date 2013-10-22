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

  $scope.memeAreaHeight = function(){
    $scope.areaHeight = window.innerHeight - $scope.chromeHeight;
    return {'height' : $scope.areaHeight + 'px'};
  }

  $scope.frameStyle = function(){
    var calculatedWidth = $scope.areaHeight / $scope.imageRatio;
    var availableHorizontalSpace = window.innerWidth - 32;

    if(availableHorizontalSpace <= calculatedWidth){
      return {
        'width' : availableHorizontalSpace + 'px',
        'height' : availableHorizontalSpace * $scope.imageRatio + 'px',
        'font-size' : (availableHorizontalSpace / 677) + 'em'
      }
    }
    else {
      return {
        'width' : calculatedWidth + 'px',
        'height' : $scope.areaHeight + 'px',
        'font-size' : (calculatedWidth / 677) + 'em'
      }
    }
  }

  $scope.utf8ToBase64 = function(str){
    return window.btoa(unescape(encodeURIComponent(str))).replace(/=+$/, '');
  }
  $scope.b64ToUtf8 = function(str){
    return decodeURIComponent(escape(window.atob(str)));
  }

  angular.element(window).bind('resize', function(){
    $scope.$apply();
  });
}

function rootController($scope, $route, $routeParams, $location, $rootScope, MemeData){
  $scope.createLink = function(){
    $scope.lincoln = $scope.docRoot + 'img?url=' + $scope.utf8ToBase64($scope.imageUrl) + '&fl=' + $scope.utf8ToBase64($scope.firstLine) + '&sl=' + $scope.utf8ToBase64($scope.secondLine);
    setTimeout(function(){
      document.querySelector('.share-field input').select();
    }, 100);
  };

  $rootScope.chromeHeight = 32 + 48 + 60;

  var memeData = MemeData.getMemeData();
  $scope.imageUrl = memeData.imageUrl;
  $scope.firstLine = memeData.firstLine;
  $scope.secondLine = memeData.secondLine;

  $scope.autoSelect = function($event){
    $event.currentTarget.setSelectionRange(0,7777777);
  }
}

function imageController($scope, $route, $routeParams, $location, $rootScope, MemeData){
  $scope.imageUrl = $scope.b64ToUtf8($routeParams.url);
  $scope.firstLine = $scope.b64ToUtf8($routeParams.fl);
  $scope.secondLine = $scope.b64ToUtf8($routeParams.sl);

  $rootScope.chromeHeight = 32 + 60;

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

ngMeme.directive('cradle', function($rootScope){
  return {
    restrict: "A",
    link: function(scope, element, attrs){
      element.bind('load', function(){
        scope.$apply(function(){
          $rootScope.imageRatio = element[0].naturalHeight / element[0].naturalWidth;
        });
      });
    }
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
