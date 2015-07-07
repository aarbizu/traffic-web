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

        var createChart = function(id, chart) {
            var now = new Date();
            var month = now.getMonth() + 1;
            var year = now.getFullYear();
            var logfile = '/logs/' + pad(month) + '-' + year + '-' + id + '.csv';
            chart = c3.generate({
                bindto: '#chart',
                data: {
                    x: 'time',
                    xFormat: '%Y-%m-%d:%H:%M:%S',
                    url: logfile,
                    type: 'line',
                    colors: {
                        speed: ['#ff9900']
                    }
                },
                axis: {
                    x: { type: 'timeseries', 
                    tick: { 
                        count: 4,
                        format: '%m/%d-%H:%M', 
                        culling: { 
                            max: 5 }
                        },
                    },
                    y: {
                        min: 0,
                        max: 80,
                        padding: {
                            top: 0,
                            bottom: 0,
                        },
                    }
                },
                grid: {
                    y: { show: true },
                },
                legend: {
                    show: false,
                },
                point: {
                    show: false,
                    r: 1.5,
                },
            }); 
        };

        var pad = function(num) {
            var s = '0' + num;
            return s.substr(s.length-2);
        };

        return {
            list: function() {
                return fetch(trafficArray);
            },
            detail: function(id, chart) {
                createChart(id, chart);
                return trafficArray[id];
            }
        };

    }]);

