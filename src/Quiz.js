import React from 'react';
import { Container } from 'react-bootstrap';
import Question from './component/Question';
import axios from 'axios';
import InputForm from './component/InputForm';
import NavBar from './component/NavBar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import auth from './services/auth';
import { Progress } from 'antd';

const months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"];

class Quiz extends React.Component {
  constructor() {
    super()
    this.state = {
      isStarted: false,
      counter: 3,
      countdown: 3,
      isWrong: false,
      questions: null,
      score: 0,
      questionsAsked:[],
      questionIndex: null,
      isLoggedIn: false,
      isNotAllowed: false,
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
        console.log(error);
      });
    this.timer = setInterval(this.decrementCount, 1000);
  }

  decrementCount = () => {
    let counter = this.state.counter - 1;
    this.setState(prevState => ({counter: prevState.counter - 1}));
    if (counter > 0) {
      this.setState({countdown: counter});
    }
    if (counter === 0) {
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
  //<h3 className="my-4">{this.state.countdown}</h3>
  render() {
    if (!this.state.isLoggedIn && this.props.profile.length !== 1) {
      return <Redirect to="/"/>
    }
    if (this.state.score === 6 && this.state.isNotAllowed) {
      return (
        <div>
        <NavBar history={this.props.history}/>
        <Container>
          <h3 className="my-4">Congratulations on getting all the questions correct!</h3>
          <p>However, you already have 3 Hall of Fame entries which is the maximum per account.
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
        <Container>
          <h3 className="my-4">Congratulations on being a verified BTS-ARMY for this {months[new Date().getMonth()]}'s Hall of Fame!</h3>
          <p>Now you may input your Twitter handle to be put up on our Hall of Fame where everyone can see. </p>
          <InputForm history={this.props.history}/>
        </Container>
        </div>
      )
    }
    return (
      <div>
      <NavBar history={this.props.history}/>
      <Container style={styles.container}>
        { !this.state.isStarted && !this.state.isWrong &&
          (<Progress type="circle" percent={(1- this.state.counter/3) * 100} format={() => `${this.state.countdown}`} />)
        }
        {
          this.state.isStarted && !this.state.isWrong &&
          ( <div>
              <h4 style={styles.score}>Score: {this.state.score}/6</h4>
              <Question question={this.getRandomQuestion()}
                updateScore={this.updateScore}
                addIndexToAskedList={this.addIndexToAskedList}
                questionIndex={this.state.questionIndex}
              />
            </div>)
        }
        {
          this.state.isWrong &&
          (<h3>Sorry! You got the question wrong. Do try our quiz again when you are ready.</h3>)
        }
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
  score: {
    marginBottom: 20,
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Quiz);
