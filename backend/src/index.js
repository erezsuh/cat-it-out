/********* Todo - Refactor this file ************/
const {dashboardWsConnection,currentPlayers} = require('./controllers/api');
const WebSocketServer = require('ws').Server;

const dashboard_port = process.env.PORT || 40510;
const players_port =process.env.PLAYERS_PORT || 45011;

const dashboardWsServer = new WebSocketServer({port: dashboard_port});
const playersWsServer = new WebSocketServer({port: players_port});

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
