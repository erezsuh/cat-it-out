import React, { Component } from 'react';
import axios from 'axios';

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
        //Todo - Remove the ws address (magic) from here
        this.wsSocket = new WebSocket('ws://localhost:40510');
        this.wsSocket.onopen = function () {
            //Todo - update to a function
            console.log("Ws connected");
        };

        this.wsSocket.onmessage = this.handleNewMessage;

        axios.get('/api/playerslist')
            .then((reponse) => {
                this.setState({
                    activePlayers: reponse.data
                });
            });
    }

    componentWillUnmount() {
        //Todo - add handler of connection close so we won't try to close a closed connection
        this.wsSocket.close();
    }

    render() {

        const players = this.state.activePlayers.map((name) => <li key={name}>{name}</li>);

        return <div>
            <h2>Cut-it-out Dashboard</h2>
            <h3>Current Players:</h3>
            <ul>{players}</ul>
        </div>;
    }
}

export default GameDashboard;