'use strict';
angular.module('main')
  .service('TwitterFunc', function ($http, $window) {
    this.data = {
      tweets: []
    }

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


    this.getTweets = function () {
      // bnötigte Funktionen
      var that = this;
      this.getToken().then(function () {
        // 
        return $http({

          method: 'GET',
          // hardgecodete Suche nach 'apple'' 
          url: 'https://api.twitter.com/1.1/search/tweets.json?q=apple',

        })

          .then(function (result) {

            // Ausgabe der Objekte in der Console
            // console.log(result.data.statuses);
            
            that.data.tweets = result.data.statuses;
            
            //var allTweets= [];
            //console.log(result.data);
            //var datenTweets = result.data.statuses;
            // console.log(datenTweets[2].text);
            //console.log(datenTweets[2].user.screen_name);
            //var nameT = datenTweets[2].user.screen_name;

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
  });
