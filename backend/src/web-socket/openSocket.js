
const port = process.env.PORT || 40510;
const ws = new WebSocket(`ws://localhost:${port}`);

ws.onopen = function () {
    console.log('websocket is connected ...')
    ws.send('connected')
}

ws.onmessage = function (ev) {
    console.log(ev);
}