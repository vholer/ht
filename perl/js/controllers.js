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

    var timestamp = new Date(data.timestamp * 1000)
    $scope.timestampFmt = timestamp.toString();
  });

  $http.get('sensor/' + $routeParams.id + '/history.json').success(function(data) {
    //$scope.graphData = data;

    var cData = [], cLabels = [];
    for (var i = 0; i < data.length; i++) {
      cLabels.push( data[i].timestamp );
      cData.push( data[i].humidity );
    };

    alert(cLabels);
    alert(cData);
  });
}
//SensorDetailCtrl.$inject = ['$scope', '$routeParams'];
