'use strict';

var app = angular.module('trafficApp');

app.controller('HistCtrl', ['$scope', '$stateParams', 'TrafficService', 
    function ($scope, $stateParams, TrafficService) {
        $scope.selectedItem = TrafficService.detail($stateParams.id);

        $scope.chart = c3.generate({
            bindto: '#chart',
            data: {
                rows: [
                    ['data1', 'data2', 'data3'],
                    [90, 120, 300],
                    [40, 160, 240],
                    [50, 200, 290],
                    [120, 160, 230],
                    [80, 130, 300],
                    [90, 220, 320],
                ]
            }
        });
    }]);