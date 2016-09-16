'use strict';
angular.module('main')
  .controller('ListCtrl', function (TwitterFunc, $ionicLoading, $scope, $cordovaGeolocation) {
    //$ionicLoading.show(); // Displays the native loading indicator
    this.searchQuery = TwitterFunc.data.suchBegriff;
    this.geoloc = TwitterFunc.data.position;
    this.data = TwitterFunc.data;
    //this.getTweet = TwitterFunc.data.tweet;
    //console.log(angular.isObject(this.data))
    // Aufruf der getTweets()-Funktion
    //TwitterFunc.getTweets();
    // $ionicLoading.hide(); // Hides the loading indicator
    //$ionicLoading.hide(); // Hides the loading indicator
    this.getIndex = function (index) {
      //  console.log(index);
      TwitterFunc.index(index);
    };
    this.getRefresh = function () {
      this.data = TwitterFunc.data;
      TwitterFunc.getTweets();
      console.log('Refresher-');
      $scope.$broadcast('scroll.refreshComplete');
      //$ionicLoading.hide(); // Hides the loading indicator
      //TwitterFunc.doRefresh()
      //this.getTweet = TwitterFunc.data.tweet;
    };
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
    //
    this.doSearch = function () {
      TwitterFunc.data.suchBegriff = this.searchQuery;
      this.showTweets();
    };
    this.doEnterSearch = function (event) {
      if (event.charCode === 13) {//if enter then hit the search button
        this.doSearch();
        document.getElementById('keyboard').blur();
      }
    };
    // this.getLocation = function () {
    //   var posOptions = { timeout: 50000, enableHighAccuracy: true };
    //   $cordovaGeolocation
    //     .getCurrentPosition(posOptions)
    //     .then(function (position) {
    //       $scope.coords = position.coords;
    //       // var lat  = position.coords.latitude
    //       // var long = position.coords.longitude
    //       console.log('Location_:', $scope.coords);
    //     });
    // };
    this.getLocation = function () {
      var that = this;
      var posOptions = { timeout: 10000, enableHighAccuracy: true };
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          that.coords = position.coords;
          TwitterFunc.data.lat = position.coords.latitude;
          TwitterFunc.data.long = position.coords.longitude;
          TwitterFunc.getTweetsByGeo(TwitterFunc.data.lat, TwitterFunc.data.long);
        });
    };

    // this.showTweetsLocation = function (){
    //   $ionicLoading.show();
    //   TwitterFunc.getLocation();
    //   console.log('Location-',;
    //   // // TwitterFunc.getTweetsByGeo(TwitterFunc.data.position).finally(function () {
    //   // //   console.log('location',TwitterFunc.position);
    //   //   $ionicLoading.hide();
    //   // });
    //   $ionicLoading.hide();
    // };

  });
