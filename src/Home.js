import React from 'react';
import './App.css';
import { Row, Col, Container, Image, Button, Carousel } from 'react-bootstrap';
import NavBar from './component/NavBar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

  async onComponentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
  }

  onStartQuiz() {
    console.log(this.props.location.profileObj)
    this.props.history.push("/quiz");
  }

  render() {
    if (!this.state.isLoggedIn && this.props.profile.length !== 1) {
      return <Redirect to="/"/>
    }
    return (
      <div>
      <NavBar history={this.props.history}/>
      <Container>
        <h1 className="my-4">Am I a verified BTS-ARMY?</h1>
        <Row>
          <Col md={8}>
            <ImageCarousel/>
          </Col>
          <Col md={4}>
            <h3 className="my-3">Take our 2 minute quiz to find out!</h3>
            <p>Complete the quiz and get all the questions correct to get a chance to put your twitter handle in our
            verified BTS-ARMY hall of fame! This hall of fame is renewed monthly so do come back to do this quick quiz
            to be back on the BTS-ARMY hall of fame.</p>
            <h3 className="my-3">Quiz Rules</h3>
              <ul>
                <li>Each question has 4 options</li>
                <li>You are given 20 seconds per question</li>
                <li>There is 6 questions per quiz</li>
                <li>Questions are random</li>
              </ul>
            <div style={{marginTop:30}}>
            <Button onClick={this.onStartQuiz}>Start Quiz</Button>
            </div>
          </Col>
        </Row>
    </Container>
    </div>
    );
  }
}

const styles = {
  carousel: {
    marginBottom: 30
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Home);
