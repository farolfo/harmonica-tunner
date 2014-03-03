'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('HarmonicaTunerCtrl', ['$scope', function($scope) {

        $scope.selectedKey = 'C';
        $scope.keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

        $scope.isSelected = function(key) {
            return $scope.selectedKey === key;
        };

        $scope.selectKey = function(key) {
            $scope.selectedKey = key;
        };
    }]);