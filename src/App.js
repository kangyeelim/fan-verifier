import React from 'react';
import './App.css';
import Home from './Home';
import HallOfFame from './HallOfFame';
import Quiz from './Quiz';
import Login from './Login';
import Account from './Account';
import Contact from './Contact';
import Music from './Music';
import Community from './Community';
import PostForm from './PostForm';
import Posts from './Posts';
import Drafts from './Drafts';
import Favourites from './Favourites';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './component/Footer';

class App extends React.Component {
  render() {
    return (
      <div id="page-container">
      <div id="content-wrap">
      <Router>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/hallOfFame" component={HallOfFame}/>
          <Route exact path="/quiz" component={Quiz}/>
          <Route exact path="/account" component={Account}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/music" component={Music}/>
          <Route exact path="/community" component={Community}/>
          <Route exact path="/createPost" component={PostForm}/>
          <Route exact path="/drafts" component={Drafts}/>
          <Route exact path="/myposts" component={Posts}/>
          <Route exact path="/favourites" component={Favourites}/>
        </Switch>
      </Router>
      </div>
      <Footer/>
      </div>
    );
  }
}

export default App;
