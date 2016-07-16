var WaveformData = require('waveform-data');
var Promise = require('promise');
var d3 = require('d3');

var d3Waveform = function (path) {
  getWaveformData(path).then(drawGraph);
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

function drawGraph(waveform) {
  console.log(waveform);

  var svg = d3.select('#vis').append('svg')
    .attr('width', '1000px')
    .attr('height', '500px');

  var x = d3.scale.linear();
  var y = d3.scale.linear();
  var offsetX = 100;

  x.domain([0, waveform.adapter.length]).rangeRound([0, 1024]);
  y.domain([d3.min(waveform.min), d3.max(waveform.max)]).rangeRound([offsetX, -offsetX]);

  var area = d3.svg.area()
    .x(function (d, i) { return x(i); })
    .y0(function (d, i) { return y(waveform.min[i]); })
    .y1(function (d, i) { return y(d); });

  svg.append('path')
    .datum(waveform.max)
    .attr('transform', function () { return 'translate(0, ' + offsetX + ')'; })
    .attr('d', area);
}
