import React from 'react';
import './App.css';
import { Row, Col, Container, Button, Carousel } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import { connect } from 'react-redux';
import auth from './services/auth';

function ImageCarousel() {
    return (
      <Carousel style={styles.carousel}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./img/bts-1.jpg")}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./img/bts-2.jpg")}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={require("./img/bts-3.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    );
}

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    }
    this.onStartQuiz = this.onStartQuiz.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
  }

  onStartQuiz() {
    console.log(this.props.location.profileObj)
    this.props.history.push("/quiz");
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
      <Container>
        <h1 className="my-4">Am I a verified BTS-ARMY?</h1>
        <Row style={{display: 'flex', alignItems:'center'}}>
          <Col fluid md={8}>
            <ImageCarousel/>
          </Col>
          <Col md={4} style={styles.instruction}>
            <Container style={styles.instructionContainer}>
            { this.state.isLoggedIn && (
              <div>
              <h3>Take our 2 minute quiz to find out!</h3>
              <p style={styles.text}>Complete all quiz questions correctly to get a chance to put your social media username
              in our Hall of Fame! This hall of fame is renewed on the first of the month so do come back to do this quiz
              to be back on the Hall of Fame next month.</p>
              </div>
            )}
            { !this.state.isLoggedIn && (
              <div>
              <h3>Take our 2 minute quiz to find out!</h3>
              <p style={styles.text}>Have fun and try to complete all the quiz questions correctly. However, do note that
              you are not logged in so you would not be able to input your social media username in our Hall of Fame
              upon completion.</p>
              </div>
            )}
            <h3 className="my-3">Quiz Rules</h3>
              <ul>
                <li style={styles.text}>Each question has 4 options, 1 is correct</li>
                <li style={styles.text}>You are given 20 seconds per question</li>
                <li style={styles.text}>There is 6 questions per quiz</li>
                <li style={styles.text}>Questions are random</li>
              </ul>
            <div style={{marginTop:30}}>
            <Button onClick={this.onStartQuiz}>Start Quiz</Button>
            </div>
            </Container>
          </Col>
        </Row>
    </Container>
    </div>
    );
  }
}

const styles = {
  carousel: {
    marginBottom: 10,
    marginTop: 10
  },
  text: {
    fontSize: 15.5,
    color: '#3e3e3e'
  },
  instruction: {
    minWidth: 350
  },
  instructionContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Home);
