import React from 'react';
import './App.css';
import Home from './Home';
import HallOfFame from './HallOfFame';
import Quiz from './Quiz';
import Login from './Login'
import LoginHallOfFame from './LoginHallOfFame';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './services/protected.route';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/publicHallOfFame" component={LoginHallOfFame}/>
          <ProtectedRoute path="/home" component={Home}/>
          <ProtectedRoute path="/hallOfFame" component={HallOfFame}/>
          <ProtectedRoute path="/quiz" component={Quiz}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
