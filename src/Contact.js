import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import auth from './services/auth';

class Contact extends React.Component {
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
        <NavBar history={this.props.history} activeKey={0}/>
      )}
      { !this.state.isLoggedIn && (
        <LoginNavBar activeKey={5}/>
      )}
      <Container>
        <h1 className="my-4">Contact Developer</h1>
        <Row>
          <Col md={6}>
            <Image fluid style={styles.image} src={require('./img/bwl.jpg')}/>
          </Col>
          <Col md={6}>
            <h3 className="my-3">Message from the developer</h3>
            <p style={styles.text}>
            I am a 21 year old ARMY from Singapore and I am the only developer for this website.
            This is my pet project out of my love for BTS
            and I hope you would be understanding of any bugs or flaws in it.
            However, do feel free to send me an email regarding the bug or flaw so I can try to fix it.
            Include 'Bug/flaw in BTS-ARMY verifier' in your email subject.
            Also, you can follow me on my stan Twitter account @kookybunnyhunny and of course I am
            a verified BTS-ARMY in the Hall of Fame!
            </p>
            <h3>Would you like to contribute to the database of quiz questions?</h3>
            <p style={styles.text}>
            As long as your questions are of sufficient difficulty to differenciate
            muggles from BTS-ARMYs and have 4 options to it, just send it over and
            I will look into it and get back to you once it
            is added to the database. Include 'Question Submission for BTS-ARMY verifier'
            in your email subject.
            </p>
            <h3>Suggestions to improve the website?</h3>
            <p style={styles.text}>
            I seek improvement so if there is something you would like me to try out, do email me too!
            Include 'Suggestions for BTS-ARMY verifier' in your email subject.
            </p>
            <p style={styles.text}>
            Email: kangyee2408@gmail.com
            </p>
          </Col>
        </Row>
      </Container>
      </div>
  );
  }
}

const styles = {
  container: {
    padding: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginBottom:30,
    color: '#3e3e3e'
  },
  image: {
    width: 500,
    marginTop: 10
  }
}
export default Contact;
