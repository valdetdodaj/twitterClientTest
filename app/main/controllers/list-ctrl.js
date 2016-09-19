'use strict';
angular.module('main')
  .controller('ListCtrl', function (TwitterFunc, $ionicLoading, $scope, $cordovaGeolocation) {
    //$ionicLoading.show(); // Displays the native loading indicator
    this.searchQuery = TwitterFunc.data.suchBegriff;
    this.data = TwitterFunc.data;
    this.lati = TwitterFunc.data.lat;
    this.longi = TwitterFunc.data.long;
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
      //TwitterFunc.doRefresh()
      //this.getTweet = TwitterFunc.data.tweet;
    };
    //Eingabespezifische Suche
    this.showTweets = function () {
      $ionicLoading.show();
      TwitterFunc.getTweets(TwitterFunc.data.suchBegriff).finally(function () {
        $ionicLoading.hide();
      });
      //console.log(TwitterFunc.data.tweets);
    };
    // this.sortByName = function () {
    //   this.propertyName = 'user.screen_name';
    //   this.reverse = true;
    //   this.tweets = TwitterFunc.data.tweets

    //   this.sortBy = function(propertyName){
    //   this.reverse = (this.propertyName === propertyName) ? !this.reverse : false; this.propertyName = propertyName;
    //   }
    // console.log('asd',TwitterFunc.data.tweets);
    // };
    // controller
    this.sortByName;
    // this.doSearch = function () {
    //   TwitterFunc.data.suchBegriff = this.searchQuery;
    //   this.showTweets();
    // };
    this.doSearch = function () {
      var that = this;
      TwitterFunc.data.suchBegriff = this.searchQuery;
      this.getLocation().then(function () {
        //console.log('Latitude---', TwitterFunc.data.lat);
        if (TwitterFunc.data.lat === undefined) {
          that.showTweets();
          //console.log('keine Location!!');
        } else {
          that.getLocation()
            .then(function () {
              TwitterFunc.getTweetsByGeo(TwitterFunc.data.suchBegriff, TwitterFunc.data.lat, TwitterFunc.data.long);
              //console.log('Lati:', TwitterFunc.data.lat);
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
  });
