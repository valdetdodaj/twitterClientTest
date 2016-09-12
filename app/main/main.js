'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/list');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/tabs.html'
    })
      .state('main.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list.html',
            // Controller fuer Liste aufgerufen
            // erzeugt im Terminal mit yo *m-ionic:controller list* im Projekte Ordner 
            controller: 'ListCtrl as ctrl'
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'tab-list': {
            templateUrl: 'main/templates/list-detail.html',
            // controller: 'SomeCtrl as ctrl'
          }
        }
      })
      .state('main.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'main/templates/about.html',
            //controller: 'DebugCtrl as ctrl'
          }
        }
      })
       .state('main.imprint', {
        url: '/imprint',
        views: {
          'tab-imprint': {
            templateUrl: 'main/templates/imprint.html',
            //controller: 'DebugCtrl as ctrl'
          }
        }
      }) ;
});
