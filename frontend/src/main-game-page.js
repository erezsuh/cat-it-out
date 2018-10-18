import React, { Component } from 'react';

class MainGamePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            gameIsOn: false
            };
    }

    componentDidMount() {
        fetch('/api/available')
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                gameIsOn: result.isOn,
                error: 'oh no'
              });
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error: error
              });
            }
          )
      }
    
    render() {
        const { error, isLoaded, gameIsOn } = this.state;
        if (!isLoaded) {
            return <h1 style={ {color:'blue'} }>Loading...</h1>
        }

        if (isLoaded && error) {
            return <h1 style={ {color:'red'} }>Error!!!...{ error } </h1>
        }

        return <h1>Hello new friend</h1>;
      }
}

export default MainGamePage;