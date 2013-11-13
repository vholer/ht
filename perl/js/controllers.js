'use strict';

/* Controllers */

function SensorListCtrl($scope, $http) {
  $http.get('sensor/.json').success(function(data) {
    $scope.sensors = data;
  });
}
//SensorListCtrl.$inject = ['$scope', '$http'];


function SensorDetailCtrl($scope, $routeParams, $http) {
  $http.get('sensor/' + $routeParams.id + '.json').success(function(data) {
    $scope.sensor = data;
    $scope.dateFmt = new Date(data.date * 1000).format('h:i:s');
  });
}
//SensorDetailCtrl.$inject = ['$scope', '$routeParams'];
