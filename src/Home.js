import React from 'react';
import './App.css';
import { Row, Col, Container, Button, Carousel } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import { connect } from 'react-redux';
import auth from './services/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { Spring, Transition, animated } from 'react-spring/renderprops';

function ImageCarousel() {
    return (
      <Transition
        items={true}
        from={{ transform: 'translate3d(-300px,0,0)' }}
        enter={{ transform: 'translate3d(0px,0,0)' }}
        leave={{ opacity:0 }}
      >
      {show => (props) => <animated.div style={props}>
      <Carousel style={styles.carousel} className="shadow">
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
      </animated.div>
      }
      </Transition>
    );
}

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      isLoading: true,
    }
    this.onStartQuiz = this.onStartQuiz.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    this.setState({isLoading: false});
  }

  onStartQuiz() {
    this.props.history.push("/quiz");
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <LoadingOutlined className="loading"/>
        </Container>
      );
    }
    return (
      <div>
      { this.state.isLoggedIn && (
        <NavBar history={this.props.history} activeKey={1}/>
      )}
      { !this.state.isLoggedIn && (
        <LoginNavBar activeKey={1}/>
      )}
      <Container>
        { this.state.isLoggedIn && (
          <Transition
            items={true}
            from={{ transform: 'translate3d(-300px,0,0)' }}
            enter={{ transform: 'translate3d(0px,0,0)' }}
            leave={{ opacity:0 }}
          >
          {show => (props) => <animated.div style={props}>
          <h1 className="my-4">Welcome {this.props.profile[0].name} !</h1>
          </animated.div>
          }
          </Transition>
        )}
        { !this.state.isLoggedIn && (
          <Transition
            items={true}
            from={{ transform: 'translate3d(-300px,0,0)' }}
            enter={{ transform: 'translate3d(0px,0,0)' }}
            leave={{ opacity:0 }}
          >
          {show => (props) => <animated.div style={props}>
          <h1 className="my-4">Am I a verified BTS-ARMY?</h1>
          </animated.div>
          }
          </Transition>
        )}
        <Row style={{display: 'flex', alignItems:'center'}}>
          <Col fluid md={8}>
            <ImageCarousel/>
          </Col>
          <Col md={4} style={styles.instruction}>
          <Spring
            config={{duration:1000}}
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <div style={props}>
            <Container style={styles.instructionContainer} className="shadow">
            { this.state.isLoggedIn && (
              <div>
              <h3>Take our 2 minute quiz!</h3>
              <p style={styles.text}>Complete all quiz questions correctly to get a chance to put your social media username
              in our Hall of Fame if you do not have 3 entries yet! This hall of fame is renewed monthly so do come back to do this quiz
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
            </div>}
          </Spring>
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
