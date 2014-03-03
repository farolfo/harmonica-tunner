'use strict';

/* Services */

var context;
var isPlaying = false;
var sourceNode = null;
var analyser = null;
var theBuffer = null;
var rafID = null;
var tracks = null;
var buflen = 2048;
var buf = new Uint8Array( buflen );
var MINVAL = 134;
var detectorElem,
    canvasContext,
    pitchElem,
    noteElem,
    detuneElem,
    detuneAmount;
var WIDTH=300;
var CENTER=150;
var HEIGHT=42;
var confidence = 0;
var currentPitch = 0;

window.addEventListener('load', init, false);
function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
};

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return Math.round( noteNum ) + 69;
}

function autoCorrelate( buf, sampleRate ) {
    var MIN_SAMPLES = 4;	// corresponds to an 11kHz signal
    var MAX_SAMPLES = 1000; // corresponds to a 44Hz signal
    var SIZE = 1000;
    var best_offset = -1;
    var best_correlation = 0;
    var rms = 0;

    confidence = 0;
    currentPitch = 0;

    if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
        return;  // Not enough data

    for (var i=0;i<SIZE;i++) {
        var val = (buf[i] - 128)/128;
        rms += val*val;
    }
    rms = Math.sqrt(rms/SIZE);

    for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
        var correlation = 0;

        for (var i=0; i<SIZE; i++) {
            correlation += Math.abs(((buf[i] - 128)/128)-((buf[i+offset] - 128)/128));
        }
        correlation = 1 - (correlation/SIZE);
        if (correlation > best_correlation) {
            best_correlation = correlation;
            best_offset = offset;
        }
    }
    if ((rms>0.01)&&(best_correlation > 0.01)) {
        confidence = best_correlation * rms * 10000;
        currentPitch = sampleRate/best_offset;
        // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
    }
//	var best_frequency = sampleRate/best_offset;
}





// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
    .service('HarmonicaService', ['$rootScope', function ($rootScope) {

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        navigator.getUserMedia( {audio:true}, gotStream );

        function updatePitch() {
            debugger
            analyser.getByteTimeDomainData( buf );
            autoCorrelate( buf, context.sampleRate );

            if (confidence <10) {
                console.log('noo');
            } else {
                pitchElem.innerText = Math.floor( currentPitch ) ;
                $rootScope.note =  noteFromPitch( currentPitch );
                console.log($rootScope.note);
                //noteElem.innerHTML = noteStrings[note%12];
            }
        };

        // success callback when requesting audio input stream
        function gotStream(stream) {
            // Create an AudioNode from the stream.
            var mediaStreamSource = context.createMediaStreamSource(stream);

            // Connect it to the destination.
            analyser = context.createAnalyser();
            analyser.fftSize = 2048;
            mediaStreamSource.connect( analyser );
            updatePitch();
        }

        return {
            getNotes: function(mainKey, cellNumber) {
                return Harmonicas[mainKey][cellNumber-1];
            }
        };
    }]);

