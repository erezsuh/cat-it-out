/********* Todo - Refactor this file ************/
require('./controllers/api');

const players = require('./logic/players')
const game = require('./logic/game')
const dashboard_port = process.env.PORT || 40510;
players.initDashboardWebSocket(dashboard_port)

const playersPort = process.env.PLAYERS_PORT || 40511;
game.initPlayersWebSocketServer(playersPort)

