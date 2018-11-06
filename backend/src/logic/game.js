const uuidv4 = require('uuid/v4');
const WebSocketServer = require('ws').Server;

var playersWss = [];

var updatingPlayer = '';
var currentGameStatus = 'waitingToStart';

function initPlayersWebSocketServer(port) {
    const dashboardWsServer = new WebSocketServer({port: port});
    dashboardWsServer.on('connection', function (ws) {
        ws.on('message', function (message) {
            console.log('received: %s SHOULDNT HAPPEN', message);
        });

        ws.on('close', function(req) {
            playersWss=playersWss.filter(socket => socket.id != ws.id)
        });

        ws.id = uuidv4()
        playersWss.push(ws)
        console.log('player is connected')
    });
}

function startGame(playersName) {
    updatingPlayer = playersName;
    currentGameStatus = 'gameStarted'
    playersWss.map( socket => socket.send( JSON.stringify({ gameStatus: currentGameStatus, playersName: updatingPlayer})))
}

function endGame(playersName) {
    updatingPlayer = playersName
    currentGameStatus = 'gameFinished'
    playersWss.map( socket => socket.send( JSON.stringify({ gameStatus: currentGameStatus, playersName: updatingPlayer})))
}

function getGameStatus(){
   return { gameStatus: currentGameStatus, playersName: updatingPlayer }
}

module.exports = {
    initPlayersWebSocketServer: initPlayersWebSocketServer,
    startGame: startGame,
    endGame: endGame,
    getGameStatus: getGameStatus,
};