import React from 'react';
import { Container } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import NavBar from './component/NavBar';
import auth from './services/auth';


class Music extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    }
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
  }

  render() {
    return (
      <div>
      { this.state.isLoggedIn && (
        <NavBar history={this.props.history}/>
      )}
      { !this.state.isLoggedIn && (
        <LoginNavBar/>
      )}
      <Container style={styles.container}>
        <h1>Discover BTS Music</h1>
        <h3>BTS Top 100 tracks</h3>
        <iframe scrolling="no"
          frameborder="0"
          allowTransparency="true"
          src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=7871175002&app_id=1"
          width="900"
          height="350">
       </iframe>
       <h3 style={styles.title}>Top Picks from BTS</h3>
       <iframe scrolling="no"
         frameborder="0"
         allowTransparency="true"
         src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=4884313904&app_id=1"
         width="900"
         height="350">
       </iframe>
       <h3 style={styles.title}>Latest Album</h3>
       <iframe scrolling="no"
         frameborder="0"
         allowTransparency="true"
         src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id=131916932&app_id=1"
         width="900"
         height="350">
       </iframe>
      </Container>
      </div>
  );
  }
}

const styles = {
  container: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 30
  }
}

export default Music;
