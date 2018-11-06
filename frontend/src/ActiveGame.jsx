import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class ActiveGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false,
            gameEnded: false,
            startingPlayer: '',
            endingPlayer: '',

        };

        this.startGame = this.startGame.bind(this);
        this.endGame = this.endGame.bind(this);
        this.handleNewMessage = this.handleNewMessage.bind(this);
    }
    
    componentDidMount() {
        //Todo - Remove the ws address (magic) from here
        this.wsSocket = new WebSocket('ws://localhost:40511');
        this.wsSocket.onopen = function () {
            //Todo - update to a function
            console.log("Ws connected");
        };

        this.wsSocket.onmessage = this.handleNewMessage;

        axios.get('/api/gamestatus')
            .then((response) => {
                const gameStatus = response.data;
                if (gameStatus === 'gameStarted') {
                    this.setState({
                        gameStarted: true,
                        startingPlayer: response.playersName
                    });
                } else if (gameStatus === 'gameFinished') {
                    this.setState({
                        gameEnded: true,
                        endingPlayer: response.playersName
                    });
                }
            });
    }

    componentWillUnmount() {
        //Todo - add handler of connection close so we won't try to close a closed connection
        this.wsSocket.close();
    }

    handleNewMessage(message) {
        const gameStatus = JSON.parse(message.data);
        if (gameStatus.gameStatus === 'gameStarted') {
            this.setState({
                gameStarted: true,
                startingPlayer: gameStatus.playersName
            });
        } else if (gameStatus.gameStatus === 'gameFinished') {
            this.setState({
                gameEnded: true,
                endingPlayer: gameStatus.playersName
            });
        }
        
    }

    startGame() {
        axios.post('/api/startGame', {
            playerName: this.props.playerName
        })
            .then( () => {
                this.setState({
                    startingPlayer: this.props.playerName,
                    gameStarted: true
                });
            });
    }

    endGame(){
        axios.post('/api/endgame', {
            playerName: this.props.playerName
        })
            .then( () => {
                this.setState({
                    endingPlayer: this.props.playerName,
                    gameEnded: true
                });
            });
    }

    render() {
        
        if (this.state.gameStarted && !this.state.gameEnded) {
            return <div>
                <h1>Game Started by {this.state.startingPlayer}</h1> 
                <button onClick={this.endGame}>End Game</button>
            </div>;
        } else if (this.state.gameEnded) {
            return <h2>No more game, finished by {this.state.endingPlayer}</h2>;
        } else {
            return <button onClick={this.startGame}>Start game</button>;
        }

    }
}

ActiveGame.propTypes = {
    playerName: PropTypes.string.isRequired
};

export default ActiveGame;