import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './component/NavBar';

class Posts extends React.Component {
  render() {
    return (
      <div>
      <NavBar history={this.props.history}/>
      <Container>
        <h1 className="my-4">Posts</h1>
      </Container>
      </div>
  );
  }
}

export default Posts;
