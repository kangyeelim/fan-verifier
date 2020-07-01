import React from 'react';
import './App.css';
import { Row, Col, Container, Image, Button } from 'react-bootstrap';

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h1 className="my-4">Am I a verified BTS-ARMY?</h1>

        <Row>
          <Col md={8}>
            <Image fluid src={require("./img/bts.jpeg")} alt=""/>
          </Col>
          <Col md={4}>
            <h3 className="my-3">Take our 2 minute quiz to find out!</h3>
            <p>Complete the quiz and get all the questions correct to get a chance to put your twitter handle in our
            verified BTS-ARMY hall of fame! This hall of fame is renewed monthly so do come back to do this quick quiz
            to be back on the BTS-ARMY hall of fame.</p>
            <h3 class="my-3">Quiz Rules</h3>
              <ul>
                <li>Each question has 4 options</li>
                <li>You are given 20 seconds per question</li>
                <li>There is 6 questions per quiz</li>
                <li>Questions are random</li>
              </ul>
            <div style={{marginTop:30}}>
            <Button href="/quiz">Start Quiz</Button>
            </div>
          </Col>
        </Row>
    </Container>
  );
  }
}

export default Home;
