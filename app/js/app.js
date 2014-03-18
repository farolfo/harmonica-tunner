'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);

  function HarmonicaTunerCtrl($scope, $rootScope) {

    $scope.selectedKey = 'C';
    $scope.keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    $scope.isSelected = function(key) {
        return $scope.selectedKey === key;
    };

    $scope.selectKey = function(key) {
        $scope.selectedKey = key;
    };

  };