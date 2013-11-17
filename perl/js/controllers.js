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

	$scope.options = {
		scaleOverlay : true,
		scaleStepWidth : 1,
		scaleSteps : 30,
		scaleOverride : true,
	};

    $scope.chart = {
      labels: cLabels,
      datasets: [
        {
            fillColor : "rgba(151,187,205,0)",
            strokeColor : "#e67e22",
            pointColor : "rgba(151,187,205,0)",
            pointStrokeColor : "#e67e22",
            data : cData,
        },
      ],
    };

  });
}
//SensorDetailCtrl.$inject = ['$scope', '$routeParams'];
