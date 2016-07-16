var http = require('http');
var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');

var app = express();
var server = http.Server(app);

app.use(serveStatic(path.join(__dirname, './')));
app.use('/dist', serveStatic(path.join(__dirname, '../dist/')));

server.listen(8080, function (req, res) {
  console.log('Listening on port 8080');
});
