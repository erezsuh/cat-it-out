var express = require('express');
var ws = require('./websocket');
var app = express();


app.get('/', function (req, res) {
   res.sendfile(__dirname + '/index.html');
});

app.listen(3001, function () {
   console.log('Example app listening on port 3001!')
});
