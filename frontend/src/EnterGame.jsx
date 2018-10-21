import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EnterGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerName: ''
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            playerName: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            playerName: event.target.value
        });

        this.props.enterGameHandler(this.state.playerName);
    }

    render() {
        return <div>
            <h1>Hello new friend</h1>
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.playerName} onChange={this.handleNameChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>;
    }
    
}

EnterGame.propTypes = {
    enterGameHandler: PropTypes.func.isRequired
};

export default EnterGame;