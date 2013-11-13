'use strict';

/* App Module */

angular.module('ht', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/sensor', {templateUrl: 'partials/sensor-list.html',   controller: SensorListCtrl}).
      when('/sensor/:id', {templateUrl: 'partials/sensor-detail.html', controller: SensorDetailCtrl}).
      otherwise({redirectTo: '/sensor'});
}]);
