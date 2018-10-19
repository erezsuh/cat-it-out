import React, { Component } from 'react';

class GameDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePlayers: []
        };

        this.handleNewMessage = this.handleNewMessage.bind(this);
    }

    handleNewMessage(message) {
        this.setState({
            activePlayers: JSON.parse(message.data)
        });
    }

    componentDidMount() {
        var ws = new WebSocket('ws://localhost:40510');
        ws.onopen = function () {
            ws.send('connected');
        };

        ws.onmessage = this.handleNewMessage;
    }

    render() {

        const players = this.state.activePlayers.map((name) => <li key={name}>{name}</li>);

        return <div>
            <h2>Cut-it-out Dashboard</h2>
            <ul>{players}</ul>
        </div>;
    }
}

export default GameDashboard;