import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';
import MainGamePage from './main-game-page';
import GameDashboard from './game-dashboard';


const mainGamePage = () => (
    <MainGamePage />
)

const gameDashboard = () => (
    <GameDashboard />
)

class App extends Component {
    render() {
        return <Switch>
            <Route path="/" exact component={mainGamePage} />
            <Route path="/dashboard" component={gameDashboard} />
        </Switch>; 
    }
}

export default App;
