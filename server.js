var express = require('express');
var router = require("./routers/router");
var restRouter = require("./routers/rest");

var app = express();

var http = require('http').Server(app);

app.use('/', router);

app.use('/public', express.static(__dirname + '/public')); // when ask for the static file in public file

app.use('/node_modules', express.static(__dirname + '/node_modules')); // when ask for the static file in node_modules file(chart.js用到)

app.use('/api/v1', restRouter);

// due to using AWS ElasticBeanstalk
var port = process.env.PORT || 3000;

http.listen(port, function(){
  console.log('Server running at http://127.0.0.1:' + port + '/');
});