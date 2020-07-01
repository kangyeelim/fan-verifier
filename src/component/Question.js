import React from 'react';
import { Container, Form, Col, Row, ProgressBar, Button } from 'react-bootstrap';

const styles = {
  container: {
    padding: 20,
  },
  radio: {
    height: 30,
  },
  button: {
    marginTop: 30,
  }
}

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      counter: 20,
      countdown: 20,
      answer: null,
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
    }
    if (counter < 0) {
      clearInterval(this.timer);
      console.log("stopped");
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
        <h4>Time Remaining:</h4>
        <ProgressBar animated now={this.state.counter} label={`${this.state.counter} s`} min={0} max={20}/>
        <h2 className="my-4">{this.props.question.question}</h2>
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
    </Container>
  );
  }
}

export default Question;
