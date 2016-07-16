var WaveformData = require('waveform-data');
var Promise = require('promise');

var d3Waveform = function (path) {
  getWaveformData(path).then(function (waveform) {
    console.log(waveform);
  });
};

global.d3Waveform = d3Waveform;

/* —————— FUNCTIONS —————— */

function getWaveformData(path) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.responseType = 'arraybuffer';
    xhr.addEventListener('load', function onResponse(progressEvent) {
      WaveformData.builders.webaudio(this.response, function onProcessed(waveform) {
        resolve(waveform);
      });
    });

    xhr.send();
  });
}
