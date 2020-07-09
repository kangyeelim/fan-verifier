import React from 'react';
import './App.css';
import Home from './Home';
import HallOfFame from './HallOfFame';
import Quiz from './Quiz';
import Login from './Login';
import Account from './Account';
import Contact from './Contact';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/hallOfFame" component={HallOfFame}/>
          <Route exact path="/quiz" component={Quiz}/>
          <Route exact path="/account" component={Account}/>
          <Route exact path="/contact" component={Contact}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
