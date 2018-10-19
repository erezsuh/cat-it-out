import React, { Component } from 'react';
import axios from 'axios';

class MainGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            gameIsAvialable: false,
            currenlyInGame: false,
            playerName: ""
            };

        this.handleNameChange = this.handleNameChange.bind(this);
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
                isLoaded: true
              });
            }
          )
    }
    
    handleNameChange(event) {
      
      this.setState({ 
        playerName: event.target.value});
    }
    
    handleEntryGame(event) {
      //Todo verify name
      this.setState({ 
        playerName: event.target.value});

      axios.post('/api/newPlayer', {
        playerName: this.state.playerName
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      
      this.setState({currenlyInGame: true});
      event.preventDefault();

    }

    render() {
        const { error, isLoaded, gameIsAvialable, currenlyInGame } = this.state;
        if (!isLoaded) {
            return <h1 style={ {color:'blue'} }>Loading...</h1>
        }

        if (isLoaded && error) {
            return <h1 style={ {color:'red'} }>Error!!!...{ error } </h1>
        }

        if (isLoaded && gameIsAvialable) {
          return <h1 style={ {color:'red'} }>The game is currenly off</h1>
        }

        if (currenlyInGame) {
          return <h1>Waiting to start the game</h1>;
        }
      
      return <div>
                <h1>Hello new friend</h1>
                <form onSubmit={this.handleEntryGame}>
                  <label>
                    Name:
                  <input type="text" value={this.state.playerName} onChange={this.handleNameChange}/>
                  </label>
                  <input type="submit" value="Submit" />
                </form>
            </div>;
      }
}

export default MainGamePage;