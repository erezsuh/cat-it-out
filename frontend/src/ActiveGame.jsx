import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class ActiveGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameStarted: false
        };

        this.startGame = this.startGame.bind(this);
    }
    
    startGame() {
        axios.post('/api/startGame', {
            playerName: this.props.playerName
        })
            .then((result) => {
                this.setState({
                    gameStarted: result
                });
            });
    }

    render() {
        return <div>
            {this.state.gameStarted ? <h1>Game Started by {this.props.playerName}</h1> : <button onClick={this.startGame}>Start game</button>}
        </div>;
        
    }
}

ActiveGame.propTypes = {
    playerName: PropTypes.string.isRequired
};

export default ActiveGame;