'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
    .service('HarmonicaService', function () {

        return {
            getNotes: function(mainKey, cellNumber) {
                return Harmonicas[mainKey][cellNumber-1];
            }
        };
    });

