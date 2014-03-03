'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('faHarmonica', function() {
        return {

            restrict: 'E',

            templateUrl: './partials/directives/faHarmonica.html',

            scope: {
                mainKey: '='
            },

            link: function (scope, elem, attrs) {
                scope.cells = [1,2,3,4,5,6,7,8,9,10];
            }
        };
  }).

    directive('faHarmonicaCell', ['HarmonicaService', function(HarmonicaService) {
        return {

            restrict: 'E',

            templateUrl: './partials/directives/faHarmonicaCell.html',

            scope: {
                number: '=',
                mainKey: '='
            },

            link: function (scope, elem, attrs) {
                scope.$watch('mainKey', function(){
                    scope.notes = HarmonicaService.getNotes(scope.mainKey, scope.number);
                }, true);
            }
        };
    }]).
    directive('faHarmonicaNote', function() {
        return {

            restrict: 'E',

            templateUrl: './partials/directives/faHarmonicaNote.html',

            scope: {
                index: '=',
                key: '=',
                type: '='
            },

            link: function (scope, elem, attrs) {
                scope.$watch('key', function() {
                    debugger
                });
            }
        };
    });
