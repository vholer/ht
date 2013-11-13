'use strict';

/* Controllers */

function SensorListCtrl($scope, $http) {
  $http.get('sensor/.json').success(function(data) {
    $scope.sensors = data;
  });
}

//PhoneListCtrl.$inject = ['$scope', '$http'];


function SensorDetailCtrl($scope, $routeParams) {
  $scope.id = $routeParams.id;
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams'];
