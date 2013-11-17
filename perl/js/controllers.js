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

  $http.get('sensor/' + $routeParams.id + '/history/day.json').success(function(data) {
    //$scope.graphData = data;

    var cData = [], cLabels = [];
    for (var i = 0; i < data.length; i++) {
      cLabels.push( new Date(data[i].timestamp*1000).getHours() );
      cData.push( data[i].temperature );
    };

    $scope.chart = {
            scaleSteps : 1,
			scaleStepWidth : 1,
			scaleStartValue : 1,
			scaleOverride : true,
      labels: cLabels,
      datasets: [
        {
            fillColor : "rgba(151,187,205,0)",
            strokeColor : "#e67e22",
            pointColor : "rgba(151,187,205,0)",
            pointStrokeColor : "#e67e22",
            data : cData,
            scaleSteps : 1,
			scaleStepWidth : 1,
			scaleStartValue : 1,
        },
      ],
    };

  });
}
//SensorDetailCtrl.$inject = ['$scope', '$routeParams'];
