import React, {Component} from 'react';
import axios from 'axios';
import EnterGame from './EnterGame';
import ActiveGame from './ActiveGame';

class MainGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorLaoding: null,
            isLoaded: false,
            gameIsAvialable: false,
            currenlyInGame: false,
            playerName: '',
        };

        this.handleEntryGame = this.handleEntryGame.bind(this);
    }

    componentDidMount() {
        fetch('/api/available')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        gameIsOn: result.isOn
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        errorLaoding: error.toString()
                    });
                }
            );
    }

    handleEntryGame(newPalyerName) {
        axios.post('/api/newplayer', {
            playerName: newPalyerName
        })
            .then(function (response) {
                // eslint-disable-next-line
                console.log(response); 
            })
            .catch(function (error) {
                // eslint-disable-next-line
                console.log(error);
            });
      
        this.setState({
            currenlyInGame: true,
            playerName: newPalyerName
        });
    }

    render() {
        const { errorLaoding, isLoaded, gameIsAvialable, currenlyInGame, playerName } = this.state;
        
        if (!isLoaded) {
            return <h1 style={ {color:'blue'} }>Loading...</h1>;
        }

        if (isLoaded && errorLaoding) {
            return <h1 style={ {color:'red'} }>Error!!!...{ errorLaoding } </h1>;
        }

        if (isLoaded && gameIsAvialable) {
            return <h1 style={ {color:'red'} }>The game is currenly off</h1>;
        }

        if (currenlyInGame) {
            return <ActiveGame playerName={playerName}/>;
        }
      
        return <EnterGame enterGameHandler={this.handleEntryGame} />;
    }
}

export default MainGamePage;