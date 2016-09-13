'use strict';
angular.module('main')
  .controller('ListCtrl', function (TwitterFunc, $ionicLoading) {

    $ionicLoading.show(); // Displays the native loading indicator

    this.data = TwitterFunc.data;
    //console.log(angular.isObject(this.data))
    //
    // Aufruf der getTweets()-Funktion
    TwitterFunc.getTweets();
    $ionicLoading.hide(); // Hides the loading indicator
    this.getIndex = function (index) {
      //  console.log(index);
      TwitterFunc.index(index);
    };
  });
