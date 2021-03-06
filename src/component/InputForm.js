import React from 'react';
import { Col, InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

class InputForm extends React.Component {

  constructor() {
    super();
    this.state = {
      social:"",
      username:"",
      //isNotAllowed:false,
    }
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleSocialMediaInput = this.handleSocialMediaInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.username) {
      this.setState({username:this.props.username});
    }
    if (this.props.social) {
      this.setState({social:this.props.social});
    }
  }

  handleSocialMediaInput(e) {
    var social = e.target.value;
    this.setState({social:social});
  }

  handleUsernameInput(e) {
    var username = e.currentTarget.value;
    this.setState({username:username});
  }

  onSubmit() {
    if (this.state.social == "" || this.state.username == "") {
      alert("Did not fill in social media or username");
    }

    if (this.props.isEdit) {
      axios.post(`http://localhost:5000/hallOfFameEntries/update/${this.props.id}`, {
        googleId: this.props.profile[0].googleId,
        social: this.state.social,
        name: this.state.username
      })
        .then(res => {
          console.log("Updated HOF entry into database");
          this.props.refreshPage();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios.post('http://localhost:5000/hallOfFameEntries/add', {
        googleId: this.props.profile[0].googleId,
        social: this.state.social,
        name: this.state.username
      })
        .then(res => {
          console.log("Added HOF entry into database");
        })
        .catch((error) => {
          console.error(error);
        });
      this.props.history.push("/hallOfFame");
    }
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
             value={this.state.social}
           >
            <option value="" disabled>Choose</option>
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
              <FormControl value={this.state.username} id="username" placeholder="Username" onChange={this.handleUsernameInput}/>
            </InputGroup>
          </Col>
        </Form.Row>
        <div style={{marginTop:20}}>
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
