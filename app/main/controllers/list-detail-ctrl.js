'use strict';
angular.module('main')
  .controller('ListDetailCtrl', function (TwitterFunc) {
    //
    // console.log('-------', this.data = TwitterFunc.data.tweets);
    //
    // console.log('Hello from your Controller: ListCtrl in module main:. This is your controller:', this);
    // Aufruf der getTweets()-Funktion
    // TwitterFunc.getTweets();
    this.getTweet = TwitterFunc.data.tweet;
    //console.log('DETAIL', this.getTweet);
    //console.log(TwitterFunc.data.tweet.user.screen_name);
  });
