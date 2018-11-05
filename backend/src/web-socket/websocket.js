// TODO - why do we need it?
const port = process.env.PORT || 40510;
const WebSocketServer = require('ws').Server;

wss = new WebSocketServer({port: 40510});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message);
  });

  var interval = setInterval(
    () => ws.send(`${new Date()}`),
    1000
  );

  setTimeout( () => clearInterval(interval), 5000 );
});