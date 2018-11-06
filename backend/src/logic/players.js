const WebSocketServer = require('ws').Server;

var playersList = []
var isDashboardConnected = false
var dashboardWs = null

function onNewPlayerAdded(players_name) {
    console.log(players_name)
    playersList.push(players_name)
    console.log("hihi");
    if (isDashboardConnected) {
        console.log("hihi");
        console.log(isDashboardConnected);
        dashboardWs.send(JSON.stringify(playersList));
    }
}

function getAllPlayers() {
    return playersList
}

function initDashboardWebSocket(dashboardPort) {
    const dashboardWsServer = new WebSocketServer({port: dashboardPort});
    dashboardWsServer.on('connection', function (ws) {
        ws.on('message', function (message) {
            console.log('received: %s', message);
        });

        ws.on('close', function(id) {
            console.log('Connection ' +  id + ' has left the server');
            isDashboardConnected = false;
        });

        if (isDashboardConnected) {
            console.log('A dashboard already connected!!')
            ws.close()
        }

        console.log('Dashboard is connected')
        isDashboardConnected = true
        dashboardWs = ws;
    });
}

module.exports = {
    onNewPlayerAdded: onNewPlayerAdded,
    getAllPlayers: getAllPlayers,
    initDashboardWebSocket: initDashboardWebSocket  
};