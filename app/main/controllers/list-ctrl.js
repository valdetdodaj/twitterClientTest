'use strict';
angular.module('main')
.controller('ListCtrl', function (TwitterFunc) {

  console.log('Hello from your Controller: ListCtrl in module main:. This is your controller:', this);
  // Aufruf der det getTweets()-Funktion 
  
  var testTW = TwitterFunc.getTweets();
  

});
