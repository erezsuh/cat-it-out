var express = require('express');
var ws = require('./websocket');
var app = express();
var bodyParser = require("body-parser");

const GAME_STATUS = true;

var currentPlayers = [];
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
   res.sendfile(__dirname + '/index.html');
});

app.get('/api/available', function (req, res) {
    console.log('/api/available')

   	const game_state = { isOn: GAME_STATUS }
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(game_state))
});

app.post('/api/newPlayer', function (req, res) {
    console.log('new Player!!' + req.body.playerName);
    currentPlayers.push(req.body.playerName)
    res.send();
});

app.listen(3001, function () {
   console.log('Example app listening on port 3001!')
});
