/********* Todo - Refactor this file ************/
var express = require('express'); // Todo -  use ES6 to require/import packages
var app = express();
var bodyParser = require("body-parser");

const GAME_STATUS = true;
const DASHBOARD_PORT = 45010;
const PLAYERS_PORT = 45011;
var currentPlayers = [];
var dashboardWsConnection = null;

var WebSocketServer = require('ws').Server;
dashboardWsServer = new WebSocketServer({port: DASHBOARD_PORT});
dashboardWsServer.on('connection', function (ws) {
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

playersWsServer = new WebSocketServer({port: PLAYERS_PORT});
playersWsServer.on('connection', function (ws, req) {
    console.log(`req:${req}`);
    ws.on('message', function (message,) {
        //Todo - Handle different messages
        console.log('received: %s', message);
        currentPlayers.push(message);
    });

    ws.on('close', function(id) {
        //We don't remove the player
        console.log('Connection ' +  id + ' has left the server');
    });
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
    //Ugly :)
    dashboardWsConnection && dashboardWsConnection.send(JSON.stringify(currentPlayers));
});

app.post('/api/startGame', function (req, res) {
    console.log(`Game started by ${req.body.playerName}`);
    currentPlayers.push(req.body.playerName)
    res.send();
});


app.listen(3001, function () {
   console.log('Example app listening on port 3001!')
});
