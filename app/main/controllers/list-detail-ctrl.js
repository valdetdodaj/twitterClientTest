'use strict';
angular.module('main')
  .controller('ListDetailCtrl', function (TwitterFunc) {
    // Die Tweets speichern
    this.getTweet = TwitterFunc.data.tweet;
  });
