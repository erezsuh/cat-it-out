// TODO section:
// * use ES6 to require/import packages - add babel
// * re arange better structur around controllers/routes/views - corrently it's all here
const players = require('../logic/players')
const express = require('express'); 
const bodyParser = require('body-parser');

// TODO - shouldn't be here
const game_status = true;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
   res.sendfile(__dirname + '/index.html');
});

app.get('/api/playerslist', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(players.getAllPlayers()))
});

app.get('/api/available', function (req, res) {
    console.log('/api/available');

   	const game_state = { isOn: game_status }
	res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(game_state))
});

app.post('/api/newPlayer', function (req, res) {
    playerName = req.body.playerName
    res.send();

    players.onNewPlayerAdded(playerName);
    console.log(players.getAllPlayers());
});

app.post('/api/startGame', function (req, res) {
    console.log(`Game started by ${req.body.playerName}`);
    res.send();
});

app.listen(3001, function () {
   console.log('Example app listening on port 3001!')
});
