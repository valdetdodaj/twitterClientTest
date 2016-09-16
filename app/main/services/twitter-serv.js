'use strict';
angular.module('main')
  .service('TwitterFunc', function ($http, $window) {
    // Hier werden die Ojekte gespeichert!!
    this.data = {
      tweets: [],
      tweet: {},
      suchBegriff: '',
      lat: '',
      long: '',
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
    //
    this.getTweets = function () {
      var that = this;
      return this.getToken().then(function (suchBegriff) {
        return $http({
          method: 'GET',
          // hardgecodete Suche nach 'apple''
          // url: 'https://api.twitter.com/1.1/search/tweets.json?q=',
          url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + suchBegriff,
          // url: 'https://api.twitter.com/1.1/search/tweets.json?geocode=48.808886699999995,9.178864599999999,5km',
        })
          .then(function (result) {
            that.data.tweets = result.data.statuses;
            // Ausgabe der Objekte in der Console
            // console.log(result.data.statuses);
            // var tweets = result.data.statuses;

            // Screen_Name aus Object asulesen
            // Dies soll aber mit ng-reapeat realisiert werden und die die ion-list geladen werden mit jeweils 2 div
            // hier deshalb auskommentiert
            /* var i = 0,len = tweets.length;

            for (i; i < len; i++) {

              console.log('Screen_Name: ' + i + ' ' + tweets[i].user.screen_name);
              console.log('Text: ' + tweets[i].text);
            } */
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    };
    // Tweets aus dem Radius vom 5km aufrufen
    this.getTweetsByGeo = function () {
      var that = this;
      return this.getToken().then(function () {
        return $http({
          method: 'GET',
          url: 'https://api.twitter.com/1.1/search/tweets.json?q=stuttgart&geocode=' + that.data.lat + ',' + that.data.long + ',5km',
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
