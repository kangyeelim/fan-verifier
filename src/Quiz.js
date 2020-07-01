import React from 'react';
import { Container } from 'react-bootstrap';
import Question from './component/Question';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Form from './component/Form';

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
    }
    this.updateScore = this.updateScore.bind(this);
    this.addIndexToAskedList = this.addIndexToAskedList.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/questions/')
      .then(response => {
        this.setState({ questions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
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
    this.setState({questionsAsked:currentList});
  }

  getRandomQuestion() {
    var totalQuestions = this.state.questions.length;
    var randomIndex = Math.floor(Math.random() * totalQuestions);
    console.log("here");
    console.log("gave")
    return this.state.questions[randomIndex];
  }

  updateScore(bool) {
    if (bool) {
      this.setState(prevState => ({score: prevState.score + 1}))
    } else {
      this.setState({isWrong: true});
    }
  }

  render() {
    if (this.state.score === 6) {
      return <Form/>
    }
    return (
      <Container style={styles.container}>
        { !this.state.isStarted && !this.state.isWrong &&
          (<h1 className="my-4">{this.state.countdown}</h1>)
        }
        {
          this.state.isStarted && !this.state.isWrong &&
          ( <div>
              <h4 style={styles.score}>Score: {this.state.score}/6</h4>
              <Question question={this.getRandomQuestion()} updateScore={this.updateScore}/>
            </div>)
        }
        {
          this.state.isWrong &&
          (<h1>Sorry! You got the question wrong. Do try our quiz again when you are ready.</h1>)
        }
    </Container>
  );
  }
}

const styles = {
  container: {
    padding: 30,
  },
  score: {
    marginBottom: 20,
  }
}

export default Quiz;
