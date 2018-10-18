var express = require('express');
var ws = require('./websocket');
var app = express();

const GAME_STATUS = true;

app.get('/', function (req, res) {
   res.sendfile(__dirname + '/index.html');
});

app.get('/api/available', function (req, res) {
    console.log('/api/available')

   	const game_state = { isOn: GAME_STATUS }
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(game_state))
});

app.listen(3001, function () {
   console.log('Example app listening on port 3001!')
});
