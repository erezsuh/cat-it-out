/********* Todo - Refactor this file ************/
require('./controllers/api');

const players = require('./logic/players')

const dashboard_port = process.env.PORT || 40510;
players.initDashboardWebSocket(dashboard_port)

// TODO - Add ws for the playes for knowing about a new game/finished game
//const players_port =process.env.PLAYERS_PORT || 45011;
//const playersWsServer = new WebSocketServer({port: players_port});
