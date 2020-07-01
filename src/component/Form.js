import React from 'react';
import { Container } from 'react-bootstrap';

const months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October",
        "November", "December"];
class Form extends React.Component {
  render() {
    return (
      <Container>
        <h1 className="my-4">Congratulations on being a verified BTS-ARMY for this {months[new Date().getMonth()]}'s Hall of Fame!</h1>
        <p>Now you may input your Twitter handle to be put up on our Hall of Fame where everyone can see. </p>
    </Container>
  );
  }
}

export default Form;
