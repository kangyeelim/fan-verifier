import React from 'react';
import { Col, InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class InputForm extends React.Component {

  constructor() {
    super();
    this.state = {
      social:null,
      username:null
    }
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleSocialMediaInput = this.handleSocialMediaInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleSocialMediaInput(e) {
    var social = e.target.value;
    console.log(social);
    this.setState({social:social});
  }

  handleUsernameInput(e) {
    var username = e.currentTarget.value;
    this.setState({username:username});
  }

  onSubmit() {
    console.log(this.props.profile);
    console.log(this.props.profile[0].googleId)
    console.log(this.state.social)
    console.log(this.state.username)
    axios.post('http://localhost:5000/hallOfFameEntries/add', {
      googleId: this.props.profile[0].googleId,
      social: this.state.social,
      name: this.state.username
    })
      .then(res => {
        console.log("Added/Updated HOF entry into database");
      })
      .catch((error) => {
        console.log(error);
      });
    this.props.history.push("/hallOfFame");
  }

  render() {
    return (
      <Form>
        <Form.Row className="align-items-center">
          <Col xs="auto">
           <Form.Control
             as="select"
             custom
             id="social-media"
             style={styles.select}
             onChange={this.handleSocialMediaInput}
           >
            <option disbaled>Choose</option>
             <option value="twitter">Twitter</option>
             <option value="instagram">Instagram</option>
             <option value="facebook">Facebook</option>
           </Form.Control>
          </Col>
          <Col xs="auto">
            <InputGroup className="mb-2">
              <InputGroup.Prepend>
                <InputGroup.Text>@</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="username" placeholder="Username" onChange={this.handleUsernameInput}/>
            </InputGroup>
          </Col>
        </Form.Row>
        <div style={{marginTop:30}}>
          <Button onClick={this.onSubmit}>Submit</Button>
        </div>
      </Form>
    );
  }
}

const styles = {
  select: {
    position: 'relative',
    top:-3,
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (InputForm);
