'use strict';

/**
 * @ngdoc overview
 * @name trafficApp
 * @description
 * # trafficApp
 *
 * Main module of the application.
 */
angular
  .module('trafficApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config( [ '$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
        .state('traffic', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl'
        })
        .state('traffic.detail', {
          url: '/detail/:id',
          templateUrl: 'views/traffic-history.html',
          controller: 'HistCtrl'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        });
  }]);
