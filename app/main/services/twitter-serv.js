'use strict';
angular.module('main')
  .service('TwitterFunc', function ($http, $window) {
    // Hier werden die Ojekte/Arrays/Strings gespeichert!!
    this.data = {
      tweets: [],
      tweet: {},
      suchBegriff: '',
      lat: undefined,
      long: undefined,
      //radius: '',
    };
    var consumerKey = encodeURIComponent('KiidCd9EshA48hn8ipDOWKXH3');
    var consumerSecret = encodeURIComponent('2mnTcwXALxsnI66Jdz1R0TXJYLNp14vHi8skRuregGoQ3RMGfb');
    this.getToken = function () {
      // Verketten der beiden Schluessel (=Baerer Token) btoa() fuer encoding von strings
      var tokenCredentials = $window.btoa(consumerKey + ':' + consumerSecret);
      return $http({
        method: 'POST',
        url: 'https://api.twitter.com/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': 'Basic ' + tokenCredentials
        },
        data: 'grant_type=client_credentials'
      })
        .then(function (result) {
          // im *result* muessten Daten sein, und wenn dies der fall ist man, dann authorisiert
          if (result.data && result.data.access_token) {
            //
            $http.defaults.headers.common.Authorization = 'Bearer ' + result.data.access_token;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    // Tweets mit Suchbegriff-Funktion
    this.getTweets = function (suchBegriff) {
      var that = this;
      return this.getToken().then(function () {
        return $http({
          method: 'GET',
          url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + suchBegriff,
        })
          .then(function (result) {
            that.data.tweets = result.data.statuses;
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    // Tweets aus dem Radius vom 5km aufrufen, mit Suchbegriff
    this.getTweetsByGeo = function (suchBegriff, lat, long) {
      var that = this;
      return this.getToken().then(function () {
        return $http({
          method: 'GET',
          url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + suchBegriff + '&geocode=' + lat + ',' + long + ',5km',
        })
          .then(function (result) {
            that.data.tweets = result.data.statuses;
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    // Um den Index vom Tweet zu bekommen
    this.index = function (index) {
      this.data.tweet = this.data.tweets[index];
    };
  });
