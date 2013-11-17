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
    var temp = [], hum = [], labels = [];
    for (var i = 0; i < data.length; i++) {
      labels.push( new Date(data[i].timestamp*1000).getHours() );
      temp.push( data[i].temperature );
      hum.push( data[i].humidity);
    };

    labels.reverse();

    // temperature
    $scope.chartTempOptions =  {
      scaleOverride : true,
      scaleStepWidth : 1,
      scaleStartValue : Math.floor(Math.min.apply(null, temp))-1,
    };

    $scope.chartTempOptions.scaleSteps = Math.ceil(Math.max.apply(null, temp)) -
      $scope.chartTempOptions.scaleStartValue + 1;

    $scope.chartTempData = {
      labels: labels,
      datasets: [ {
        fillColor : "rgba(151,187,205,0)",
        strokeColor : "#e67e22",
        pointColor : "rgba(151,187,205,0)",
        pointStrokeColor : "#e67e22",
        data : temp.reverse(),
      }],
    };

    // humidity
    $scope.chartHumOptions =  {
      scaleOverride : true,
      scaleStepWidth : 1,
      scaleStartValue : Math.floor(Math.min.apply(null, hum))-1,
    };

    $scope.chartHumOptions.scaleSteps = Math.ceil(Math.max.apply(null, hum)) -
      $scope.chartHumOptions.scaleStartValue + 1;
    
    $scope.chartHumData = {
      labels: labels,
      datasets: [ {
        fillColor : "rgba(151,187,205,0)",
        strokeColor : "#e67e22",
        pointColor : "rgba(151,187,205,0)",
        pointStrokeColor : "#e67e22",
        data : hum.reverse(),
      }],
    };
  });
}
//SensorDetailCtrl.$inject = ['$scope', '$routeParams'];
