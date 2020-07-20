import React from 'react';
import { Container, Form, Col, Row, ProgressBar, Button, Image } from 'react-bootstrap';

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 20,
      countdown: 20,
      answer: null,
      isTimesUp: false,
    }
    this.onAnswerChange = this.onAnswerChange.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.decrementCount, 1000);
  }

  decrementCount = () => {
    let counter = this.state.counter - 1;
    this.setState(prevState => ({counter: prevState.counter - 1}));
    if (counter > 0) {
      this.setState({countdown: counter});
    }
    if (counter === 0) {
      this.setState({countdown: "Times up!"});
      this.setState({isTimesUp: true});
    }
    if (counter < 0) {
      clearInterval(this.timer);
    }
  }

  onAnswerChange(e) {
    this.setState({
      answer: e.currentTarget.value
      });
  }

  submitAnswer() {
    if (this.state.answer !== null) {
      if (this.state.answer === this.props.question.options[this.props.question.answer]) {
        this.props.updateScore(true);
        this.props.addIndexToAskedList(this.props.questionIndex);
        this.setState({counter: 20});
      } else {
        this.props.updateScore(false);
      }
    } else {
      this.props.updateScore(false);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Container style={styles.container} className="shadow">
      { this.state.isTimesUp && (
        <Row style={styles.row}>
          <Col>
            <h3 style={styles.message}>Sorry! Time's up. Do try our quiz again when you are ready.</h3>
          </Col>
          <Col>
            <Image fluid style={styles.image} src={require('../img/timestop.jpg')}/>
          </Col>
        </Row>
      )

      }
      { !this.state.isTimesUp && (
        <div>
          <h5>Time Remaining:</h5>
          <ProgressBar animated now={this.state.counter} label={`${this.state.counter} s`} min={0} max={20}/>
          <h4 className="my-4">{this.props.question.question}</h4>
          <Form>
            <Form.Group as={Row}>
              <Col sm={10}>
              {
                this.props.question.options.map((option)=> {
                  return (
                    <Form.Check
                      style={styles.radio}
                      type="radio"
                      label={option}
                      value={option}
                      name="answer"
                      id="answer"
                      onChange={this.onAnswerChange}
                      key={option}
                    />
                  )
                })
              }
              <Button style={styles.button} onClick={this.submitAnswer}>Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      )}
      </Container>
  );
  }
}

const styles = {
  container: {
    padding: 20,
    backgroundColor: 'white'
  },
  radio: {
    height: 30,
    fontSize: 16,
  },
  button: {
    marginTop: 30,
  },
  message: {
    alignSelf: 'center',
  },
  image: {
    width: 400,
    alignSelf: 'center',
  },
  row: {
    margin: 20,
    alignItems: 'center'
  }
}
export default Question;
