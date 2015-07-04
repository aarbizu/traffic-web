'use strict';

/**
 * @ngdoc function
 * @name trafficApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trafficApp
 */
 var app = angular.module('trafficApp');

 app.controller('MainCtrl', ['$scope', 'TrafficService', 
    function ($scope, TrafficService) {
        $scope.trafficItems = TrafficService.list();
    }]);

 app.factory('TrafficService', ['$http', 
    function ($http) {
        var trafficArray = [];
        var fetch = function(items) {
            var trafficUrl = 'http://arbz.io:8888/t?CHECKJS&callback=JSON_CALLBACK';
            var responseStatus = null;
            var errorData = null;
            items.splice(0,items.length);
            $http.jsonp(trafficUrl).
            success(function(data, status) {
                var trafficJson = angular.fromJson(data);
                var i = 0;
                angular.forEach(trafficJson.DATA, function(elem) {
                    var info = elem[1].split(' - ');
                    var level = getLevel(info[0]);
                    items.push({id:i,exit:elem[0],speed:info[0],note:info[1],category:level});
                    i = i + 1;
                });
                responseStatus = status;
            }).
            error(function(data, status) {
                errorData = data || 'Request Failed';
                responseStatus = status;
            });
            return items;
        };

        var getLevel = function(speed) {
            if (speed >= 55) {
                return 'success';
            } 
            if (speed >= 45 && speed < 55 ) {
                return 'warning';
            }
            if (speed < 45) {
                return 'danger';
            }
        };

        return {
            list: function() {
                return fetch(trafficArray);
            },
            detail: function(id) {
                return trafficArray[id];
            }
        };

    }]);

