// TODO section:
// * use ES6 to require/import packages - add babel
// * re arange better structur around controllers/routes/views - corrently it's all here
const express = require('express'); 
const bodyParser = require('body-parser');
const game_status = true;
const currentPlayers = [];
var dashboardWsConnection = null;

const app = express();
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

   	const game_state = { isOn: game_status }
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

module.exports = {
    currentPlayers,
    dashboardWsConnection
};