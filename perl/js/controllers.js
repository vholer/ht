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

	var date = new Date(dta.date * 1000)
    //$scope.dateFmt = date.getHours() + ':' date.getMinutes() + ':' + date.getSeconds();
    $scope.dateFmt = date.toISOString();
  });
}
//SensorDetailCtrl.$inject = ['$scope', '$routeParams'];
