'use strict';

/**
 * @ngdoc function
 * @name trafficApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trafficApp
 */
angular.module('trafficApp')
  .controller('MainCtrl', ['$scope', '$timeout', '$http', 
    function ($scope, $timeout, $http, $templateCache) {
        $scope.trafficItems = [];
        $scope.method = 'JSONP';
        /** $scope.url = 'http://localhost:8888/t?CHECKJS&callback=JSON_CALLBACK'; */
        $scope.url = 'http://arbz.io:8888/t?CHECKJS&callback=JSON_CALLBACK';
        
        $scope.fetch = function() {
            $scope.code = null;
            $scope.response = null;
            $scope.trafficItems.splice(0,$scope.trafficItems.length);
            $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                success(function(data, status) {
                    var trafficJson = angular.fromJson(data);
                    angular.forEach(trafficJson.DATA, function(elem) {
                        var info = elem[1].split(' - ');
                        var level = getLevel(info[0]);
                        $scope.trafficItems.push({exit:elem[0],speed:info[0],note:info[1],category:level});
                    });
                    $scope.status = status;
                }).
                error(function(data, status) {
                    $scope.data = data || 'Request Failed';
                    $scope.status = status;
                });
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

        $timeout($scope.fetch(), 3000);
  }]);
