import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Question from './component/Question';
import axios from 'axios';
import InputForm from './component/InputForm';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import { connect } from 'react-redux';
import auth from './services/auth';
import { Progress } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"];

class Quiz extends React.Component {
  constructor() {
    super()
    this.state = {
      isStarted: false,
      counter: 4,
      countdown: 3,
      isWrong: false,
      questions: null,
      score: 0,
      questionsAsked:[],
      questionIndex: null,
      isLoggedIn: false,
      isNotAllowed: false,
      isLoading: true,
    }
    this.updateScore = this.updateScore.bind(this);
    this.addIndexToAskedList = this.addIndexToAskedList.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    try {
      var response = await axios.get(`http://localhost:5000/hallOfFameEntries/googleId/${this.props.profile[0].googleId}`);
      if (response.data.length === 3) {
        this.setState({isNotAllowed: true});
      }
    } catch (error) {
      console.error(error);
    }

    axios.get('http://localhost:5000/questions/')
      .then(response => {
        this.setState({ questions: response.data })
      })
      .catch((error) => {
        console.error(error);
      });
    this.timer = setInterval(this.decrementCount, 100);
    this.setState({isLoading: false});
  }

  decrementCount = () => {
    let counter = this.state.counter - 0.1;
    this.setState(prevState => ({counter: prevState.counter - 0.1}));
    if (Math.floor(counter) > 0) {
      this.setState({countdown: Math.floor(counter)});
    }
    if (Math.floor(counter) === 0) {
      this.setState({countdown: "Start!"});
    }
    if (counter < 0) {
      clearInterval(this.timer);
      this.setState({isStarted: true});
    }
  }

  addIndexToAskedList(index) {
    var currentList = this.state.questionsAsked;
    currentList.push(index);
    this.state.questionsAsked = currentList;
  }

  getRandomQuestion() {
    while (true) {
      var totalQuestions = this.state.questions.length;
      if (totalQuestions < 6) {
        console.error("Insufficient questions in database. Contact developer");
        return;
      }
      var randomIndex = Math.floor(Math.random() * totalQuestions);
      if (!(this.state.questionsAsked.includes(randomIndex))) {
        this.state.questionIndex = randomIndex;
        return this.state.questions[randomIndex];
      }
    }
  }

  updateScore(bool) {
    if (bool) {
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      this.setState({isWrong: true});
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <LoadingOutlined className="loading"/>
        </Container>
      )
    }
    if (this.state.score ===6 && !this.state.isLoggedIn) {
      return (
        <div>
        <LoginNavBar/>
        <Container style={styles.container}>
          <h3 className="my-4">Congratulations on getting all the questions correct!</h3>
          <p style={styles.text}>However, you have to be signed in to enter your social media
          username in the Hall of Fame. Do try the quiz again when you are signed in if you wish to do so.
          If you did the quiz for fun then no worries.</p>
        </Container>
        </div>
      )
    }
    if (this.state.score === 6 && this.state.isNotAllowed) {
      return (
        <div>
        <NavBar history={this.props.history}/>
        <Container style={styles.container}>
          <h3 className="my-4">Congratulations on getting all the questions correct!</h3>
          <p style={styles.text}>However, you already have 3 Hall of Fame entries which is the maximum per account.
          You can edit or delete your previous entries under your account. If you did the quiz for
          fun then no worries.</p>
        </Container>
        </div>
      )
    }
    if (this.state.score === 6) {
      return (
        <div>
        <NavBar history={this.props.history}/>
        <Container style={styles.messageContainer}>
          <Row>
            <Col>
            <h3 className="my-4">Congratulations on being a verified BTS-ARMY for this {months[new Date().getMonth()]}'s Hall of Fame!</h3>
            <p style={styles.text}>Now you may input your social media username to be put up on our Hall of Fame where everyone can see. </p>
            <InputForm history={this.props.history}/>
            </Col>
            <Col md="auto">
            <Image fluid src={require('./img/congrats.jpg')} style={styles.messageImage}/>
            </Col>
          </Row>
        </Container>
        </div>
      )
    }
    return (
      <div>
      { this.state.isLoggedIn && (
        <NavBar history={this.props.history}/>
      )}
      { !this.state.isLoggedIn && (
        <LoginNavBar/>
      )}
      <Container style={styles.quizContainer}>
        { !this.state.isStarted && !this.state.isWrong &&
          (<Progress style={styles.countdown} type="circle" percent={(1- (this.state.counter)/4) * 100} format={() => this.state.countdown} />)
        }
        { this.state.isStarted && !this.state.isWrong &&(
          <div>
            <h4 style={styles.score}>Score: {this.state.score}/6</h4>
            <Question question={this.getRandomQuestion()}
              updateScore={this.updateScore}
              addIndexToAskedList={this.addIndexToAskedList}
              questionIndex={this.state.questionIndex}
            />
          </div>
        )}
        { this.state.isWrong && (
          <Container style={styles.messageContainer} className="shadow">
            <Row style={styles.row}>
              <Col>
                <h5 style={styles.message}>
                  Sorry! You got the question wrong. Do try our quiz again when you are ready.
                </h5>
              </Col>
              <Col>
                <Image fluid src={require('./img/pray.jpg')} style={styles.image}/>
              </Col>
            </Row>
          </Container>
        )}
    </Container>
    </div>
  );
  }
}

const styles = {
  score: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16
  },
  quizContainer:{
    padding: 50,
  },
  countdown: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  messageContainer:{
    padding: 20,
    backgroundColor: 'white'
  },
  message: {
    alignSelf: 'center',
  },
  image: {
    width: 400,
    alignSelf: 'center',
  },
  messageImage: {
    width: 400,
    alignSelf: 'center',
    marginTop: 30,
  },
  row: {
    margin: 20,
    alignItems: 'center'
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Quiz);
