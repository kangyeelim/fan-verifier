import React from 'react';
import './App.css';
import Home from './Home';
import HallOfFame from './HallOfFame';
import Quiz from './Quiz';
import Login from './Login'
import LoginHallOfFame from './LoginHallOfFame';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './protected.route';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/publicHallOfFame" component={LoginHallOfFame}/>
          <ProtectedRoute exact path="/home" component={Home}/>
          <ProtectedRoute exact path="/hallOfFame" component={HallOfFame}/>
          <ProtectedRoute exact path="/quiz" component={Quiz}/>
        </Switch>

      </Router>
    );
  }
}

/*
<Route path="/hallOfFame" component={HallOfFame}/>
<Route path="/quiz" component={Quiz}/>*/

export default App;
