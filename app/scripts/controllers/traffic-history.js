'use strict';

var app = angular.module('trafficApp');

app.controller('HistCtrl', ['$scope', '$stateParams', 'TrafficService', 
    function ($scope, $stateParams, TrafficService) {
        $scope.selectedItem = TrafficService.detail($stateParams.id);
    }]);