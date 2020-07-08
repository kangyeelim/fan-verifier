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
      isNotAllowed:false,
    }
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleSocialMediaInput = this.handleSocialMediaInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async componentDidMount() {
    try {
      var response = await axios.get(`http://localhost:5000/hallOfFameEntries/googleId/${this.props.profile[0].googleId}`);
      if (response.data.length === 3) {
        this.setState({isNotAllowed: true});
      }
    } catch (error) {
      console.error(error);
    }
    if (this.props.username) {
      this.setState({username:this.props.username});
    }
    if (this.props.social) {
      this.setState({social:this.props.social});
    }
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
    if (this.state.social == "" || this.state.username == "") {
      console.log("Did not fill in social media or username");
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
          console.log(error);
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
          console.log(error);
        });
      this.props.history.push("/hallOfFame");
    }
  }

  render() {
    if (this.state.isNotAllowed) {
      return (
        <h3>Sorry, there is a limit to 3 social media entries in the Hall of Fame per account.
        Do delete or edit any of your previous entries under your account instead. If you did
        this for fun, then no worries!</h3>
      )
    }
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
