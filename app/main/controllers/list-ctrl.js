'use strict';
angular.module('main')
  .controller('ListCtrl', function (TwitterFunc, $ionicLoading, $scope, $cordovaGeolocation) {
    this.searchQuery = TwitterFunc.data.suchBegriff;
    // this.data = TwitterFunc.data;
    // this.lati = TwitterFunc.data.lat;
    this.longi = TwitterFunc.data.long;
    this.sortByName;
    this.filterText;

    this.getIndex = function (index) {
      //  console.log(index);
      TwitterFunc.index(index);
    };
    this.getRefresh = function () {
      this.data = TwitterFunc.data;
      TwitterFunc.getTweets();
      //console.log('-Pull to refresh ausgefuehrt!-');
      $scope.$broadcast('scroll.refreshComplete');
      //$ionicLoading.hide(); // Hides the loading indicator
    };
    //Eingabespezifische Suche
    this.showTweets = function () {
      // Displays the native loading indicator
      $ionicLoading.show();
      TwitterFunc.getTweets(TwitterFunc.data.suchBegriff).finally(function () {
        // Hides the native loading indicator
        $ionicLoading.hide();
      });
      //console.log(TwitterFunc.data.tweets);
    };
    this.doSearch = function () {
      var that = this;
      TwitterFunc.data.suchBegriff = this.searchQuery;
      this.getLocation().then(function () {
        //console.log('Latitude---', TwitterFunc.data.lat);
        if (TwitterFunc.data.lat === undefined) {
          that.showTweets();
          console.log('keine Location!!');
        } else {
          that.getLocation()
            .then(function () {
              TwitterFunc.getTweetsByGeo(TwitterFunc.data.suchBegriff, TwitterFunc.data.lat, TwitterFunc.data.long);
              console.log('Lati:', TwitterFunc.data.lat);
            }).finally(function () {
              $ionicLoading.hide();
            });
        }
      });
    };
    // if enter then hit the search button
    this.doEnterSearch = function (event) {
      if (event.charCode === 13) {
        this.doSearch();
        document.getElementById('keyboard').blur();
      }
    };
    this.closeKeyboard = function (event) {
      if (event.charCode === 13) {
        document.getElementById('keyboard').blur();
      }
    };
    //Geolocation
    this.getLocation = function () {
      var posOptions = { timeout: 10000, enableHighAccuracy: true };
      $ionicLoading.show();
      return $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          TwitterFunc.data.lat = position.coords.latitude;
          TwitterFunc.data.long = position.coords.longitude;
          //TwitterFunc.getTweetsByGeo(TwitterFunc.data.lat, TwitterFunc.data.long);
          //$ionicLoading.hide();
        }, function (error) {
          console.log('Keine Geolocation', error);
        });
    };
    // Asynchrones Abfragen
    this.getLocationTweets = function () {
      var posOptions = { timeout: 10000, enableHighAccuracy: true };
      $ionicLoading.show();
      return $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          TwitterFunc.data.lat = position.coords.latitude;
          TwitterFunc.data.long = position.coords.longitude;
          TwitterFunc.getTweetsByGeo(TwitterFunc.data.lat, TwitterFunc.data.long);
          $ionicLoading.hide();
        }, function (error) {
          console.log('Keine Geolocation', error);
        });
    };
  });
