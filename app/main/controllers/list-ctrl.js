'use strict';
angular.module('main')
  .controller('ListCtrl', function ($scope, TwitterFunc) {
    this.data = TwitterFunc.data;
    console.log('Hello from your Controller: ListCtrl in module main:. This is your controller:', this);
    // Aufruf der det getTweets()-Funktion 

    TwitterFunc.getTweets();
  });
