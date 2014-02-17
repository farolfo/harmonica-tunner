'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
    .service('HarmonicaService', function () {

        var harmonicas = {
            'C': [
                {
                    blow: [
                        {key: 'C'}
                    ],
                    draw: [
                        {key: 'D'},
                        {key: 'C#'}
                    ]
                },
                {
                    blow: [
                        {key: 'E'}
                    ],
                    draw: [
                        {key: 'G'},
                        {key: 'F#'},
                        {key: 'F'}
                    ]
                },
                {
                    blow: [
                        {key: 'G'}
                    ],
                    draw: [
                        {key: 'B'},
                        {key: 'Bb'},
                        {key: 'A'},
                        {key: 'Ab'}
                    ]
                },
                {
                    blow: [
                        {key: 'C'}
                    ],
                    draw: [
                        {key: 'D'},
                        {key: 'C#'}
                    ]
                },
                {
                    blow: [
                        {key: 'E'}
                    ],
                    draw: [
                        {key: 'F'}
                    ]
                },
                {
                    blow: [
                        {key: 'G'}
                    ],
                    draw: [
                        {key: 'A'},
                        {key: 'Ab'}
                    ]
                },
                {
                    blow: [
                        {key: 'C'}
                    ],
                    draw: [
                        {key: 'B'}
                    ]
                },
                {
                    blow: [
                        {key: 'E'},
                        {key: 'Eb'}
                    ],
                    draw: [
                        {key: 'D'}
                    ]
                },
                {
                    blow: [
                        {key: 'G'},
                        {key: 'F#'}
                    ],
                    draw: [
                        {key: 'F'}
                    ]
                },
                {
                    blow: [
                        {key: 'C'},
                        {key: 'B'},
                        {key: 'Bb'}
                    ],
                    draw: [
                        {key: 'A'}
                    ]
                }
            ]
        };

        return {
            getNotes: function(mainKey, cellNumber) {
                return harmonicas[mainKey][cellNumber-1];
            }
        };
    });

