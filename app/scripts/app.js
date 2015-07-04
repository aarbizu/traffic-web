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
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
