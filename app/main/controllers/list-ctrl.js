'use strict';
angular.module('main')
.controller('ListCtrl', function (TwitterFunc, $scope) {

  console.log('Hello from your Controller: ListCtrl in module main:. This is your controller:', this);
  // Aufruf der det getTweets()-Funktion 
  
  //TwitterFunc.getTweets();
  // TwitterFunc.getTweets();
   $scope.datenT = TwitterFunc.getTweets();
   


});
