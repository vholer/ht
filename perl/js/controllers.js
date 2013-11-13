'use strict';

/* Controllers */

function SensorListCtrl($scope, $http) {
  $http.get('/sensor/.json').success(function(data) {
    $scope.sensors = data;
  });
}
//SensorListCtrl.$inject = ['$scope', '$http'];


function SensorDetailCtrl($scope, $routeParams) {
  $scope.id = $routeParams.id;
}
//SensorDetailCtrl.$inject = ['$scope', '$routeParams'];
