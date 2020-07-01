import React from 'react';
import './App.css';
import Home from './Home';
import HallOfFame from './HallOfFame';
import Quiz from './Quiz';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg" className="shadow">
          <Navbar.Brand href="#">BTS-ARMY Verifier</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Quiz</Nav.Link>
              <Nav.Link href="/hallOfFame">Hall of Fame</Nav.Link>
           </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/hallOfFame" component={HallOfFame}/>
          <Route path="/quiz" component={Quiz}/>
        </Switch>

      </Router>
    );
  }
}

export default App;
