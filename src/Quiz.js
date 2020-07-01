import React from 'react';
import { Container } from 'react-bootstrap';

class Quiz extends React.Component {
  constructor() {
    super()
    this.state = {
      isStarted: false,
      counter: 3,
      countdown: 3,
    }
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
      this.setState({countdown: "Start!"});
    }
    if (counter < 0) {
      clearInterval(this.timer);
      this.setState({isStarted: true});
    }
  }

  render() {
    return (
      <Container>
        { !this.state.isStarted &&
          (<h1  className="my-4">{this.state.countdown}</h1>)
        }
        {
          this.state.isStarted &&
          (<h1 className="my-4">Quiz</h1>)
        }

    </Container>
  );
  }
}

export default Quiz;
