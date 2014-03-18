var audioContext = new AudioContext(),
    analyser = null,
    confidence = 0,
    currentPitch = 0;

var $injector;
angular.element(document).ready(function() {
    $injector = angular.bootstrap(document, ['myApp']);
});

window.onload = function() {
    getUserMedia({audio:true}, gotStream);
}

function error() {
    alert('Stream generation failed.');
}

function getUserMedia(dictionary, callback) {
    try {
        navigator.getUserMedia =
            navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia;
        navigator.getUserMedia(dictionary, callback, error);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}

function gotStream(stream) {
    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect it to the destination.
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    mediaStreamSource.connect( analyser );
    updatePitch();
}

var rafID = null;
var tracks = null;
var buflen = 2048;
var buf = new Uint8Array( buflen );
var MINVAL = 134;  // 128 == zero.  MINVAL is the "minimum detected signal" level.

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function noteFromPitch( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note ) {
    return 440 * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency, note ) {
    return ( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
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
    }
}

function updatePitch() {
    analyser.getByteTimeDomainData( buf );

    autoCorrelate( buf, audioContext.sampleRate );

    if (confidence > 10) {
        var note =  noteFromPitch( currentPitch );
        var string = noteStrings[note%12];
        $injector.invoke(function($rootScope){
            $rootScope.$apply(function() {
                $rootScope.variable = 'lalalalaaa';
            })
        });
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    rafID = window.requestAnimationFrame( updatePitch );
}
