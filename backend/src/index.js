var express = require('express');
var app = express();
var bodyParser = require("body-parser");

const GAME_STATUS = true;

var currentPlayers = [];
var dashboardWsConnection = null;

var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({port: 40510});
wss.on('connection', function (ws) {
    ws.on('message', function (message) {
        console.log('received: %s', message);
    });

    ws.on('close', function(id) {
        console.log('Connection ' +  id + ' has left the server');
    });

    console.log('websocket is connected ...')
    
    // if (dashboardWsConnection) {
    //     console.log('OH no connection already exists');
    //     return;
    // }

    dashboardWsConnection = ws;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
   res.sendfile(__dirname + '/index.html');
});

app.get('/api/playerslist', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(currentPlayers))
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
    dashboardWsConnection.send(JSON.stringify(currentPlayers));
});

app.listen(3001, function () {
   console.log('Example app listening on port 3001!')
});
