import React from 'react';
import { Container, Form, Col, Row, Button, FormControl, InputGroup } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from './services/auth';
import Upload from './component/Upload';
import axios from 'axios';

class PostForm extends React.Component {
  _isCancelled = false;
  constructor() {
    super();
    this.state= {
      isLoggedIn: true,
      tag: "",
      title: "",
      text: "",
      images: null,
      isPosted: false,
      social: "",
      username: "",
      isEditingDraft:false,
      isMounted: false
    }
    this.handleTagInput = this.handleTagInput.bind(this);
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleImages = this.handleImages.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handleSocialMediaInput = this.handleSocialMediaInput.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.suppliedAllInputs = this.suppliedAllInputs.bind(this);
    this.updateOrPostDraft = this.updateOrPostDraft.bind(this);
  }

  async componentDidMount() {
    if (!(await auth.isAuthenticated())) {
      this.setState({isLoggedIn: false});
    }
    if (this.props.location.state != undefined) {
      const post = this.props.location.state.post;
      console.log(post.images);
      this.setState({
        title:post.title,
        text:post.description,
        tag:post.tag,
        images:post.images,
        social:post.social,
        username:post.name,
        isEditingDraft:true
       });
    }
    this.setState({isMounted:true});
  }

  handleTagInput(e) {
    this.setState({tag: e.target.value});
  }

  handleTitleInput(e) {
    this.setState({title: e.currentTarget.value});
  }

  handleTextInput(e) {
    this.setState({text: e.currentTarget.value});
  }

  handleImages(images) {
    this.setState({images:images})
  }

  handleUsernameInput(e) {
    this.setState({username: e.currentTarget.value});
  }

  handleSocialMediaInput(e) {
    this.setState({social: e.currentTarget.value});
  }

  suppliedAllInputs() {
    return (this.state.title !== "" && this.state.description !== "" &&
    this.state.tag !== "");
  }

  updateOrPostDraft(isPosted) {
    axios.post(`http://localhost:5000/posts/update/${this.props.location.state.post._id}`, {
      title: this.state.title,
      description: this.state.text,
      tag: this.state.tag,
      images: this.state.images,
      isPosted: isPosted,
      social: this.state.social,
      username: this.state.username
    })
      .then(res => {
        this.setState({isPosted: isPosted});
        this.props.history.push("/community");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit() {
    if (!this.suppliedAllInputs()) {
      alert("Please make sure the title, description, tag is inputted");
    }
    if (this.suppliedAllInputs() && this.isEditingDraft) {
      this.updateOrPostDraft(true);
    }
    if (this.suppliedAllInputs() && !this.isEditingDraft) {
      axios.post('http://localhost:5000/posts/upload', {
        title: this.state.title,
        description: this.state.text,
        tag: this.state.tag,
        googleId: this.props.profile[0].googleId,
        images: this.state.images,
        isPosted: true,
        name: this.props.profile[0].name,
        social: this.state.social,
        username: this.state.username
      })
      .then(res => {
        this.setState({isPosted: true});
        console.log("Posted!");
        this.props.history.push("/community");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  async onCancel() {
    this._isCancelled = true;
    if (this.state.isEditingDraft) {
      alert("No changes to draft saved.")
      this.props.history.push("/community");
    }
    //delete uploaded images if any
    if (this.state.images) {
      await axios.post('http://localhost:5000/images/delete', {
        images: this.state.images
      })
    }
    this.props.history.push("/community");
  }

  componentWillUnmount() {
    if (!this.state.isPosted && this.state.isLoggedIn && !this._isCancelled && this.state.isEditingDraft) {
      this.updateOrPostDraft(false);
      alert('Saved in draft.')
    }
    if (!this.state.isPosted && this.state.isLoggedIn && !this._isCancelled && !this.state.isEditingDraft) {
      axios.post('http://localhost:5000/posts/upload', {
        title: this.state.title,
        description: this.state.text,
        tag: this.state.tag,
        googleId: this.props.profile[0].googleId,
        images: this.state.images,
        isPosted: false,
        name: this.props.profile[0].name,
        social: this.state.social,
        username: this.state.username
      })
      .then(res => {
        console.log("Saved in draft!");
        alert('Saved in draft.');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
    if (!this.state.isLoggedIn && this.props.profile.length === 1) {
      return (<Redirect to="/"/>);
    }
    return (
      <div>
      <NavBar history={this.props.history}/>
      <Container style={styles.messageContainer}>
          <h3 className="my-4">New post</h3>
          <Form>
            <Form.Row className="align-items-center">
              <Col xs="auto">
              <Form.Label>Title</Form.Label>
                <Form.Control
                  style={{minWidth:500}}
                  value={this.state.title}
                  id="title" type="title"
                  placeholder="Enter title"
                  onChange={this.handleTitleInput}
                 />
              </Col>
              <Col xs="auto">
                <Form.Label>Tag</Form.Label>
                 <Form.Control
                   as="select"
                   custom
                   id="tag"
                   onChange={this.handleTagInput}
                   value={this.state.tag}
                 >
                 <option value="" disabled>Choose one</option>
                 <option value="selling">Selling</option>
                 <option value="buying">Buying</option>
                 <option value="sharing">Sharing</option>
                 <option value="others">Others</option>
                 </Form.Control>
              </Col>
            </Form.Row>
            <Form.Row style={{marginTop: 30}}>
              <Form.Label>Text/Description</Form.Label>
              <Form.Control as="textarea" rows="4" value={this.state.text} onChange={this.handleTextInput}/>
            </Form.Row>
            <Form.Row style={{marginTop: 30}}>
              <Col xs="auto">
                <Form.Label>DM me via</Form.Label>
                <Form.Control
                  as="select"
                  custom
                  id="social-media"
                  onChange={this.handleSocialMediaInput}
                  value={this.state.social}
                >
                  <option value="">No need for DM</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                </Form.Control>
              </Col>
              <Col xs="auto">
                <InputGroup style={{marginTop: 30}}>
                  <InputGroup.Prepend>
                    <InputGroup.Text>@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl value={this.state.username} id="username" placeholder="Username" onChange={this.handleUsernameInput}/>
                </InputGroup>
              </Col>
            </Form.Row>
            <Form.Text className="text-muted">
              Leave blank if you do not wish for DMs from others. Try to include your Hall of Fame entry for credibility so other ARMYs trust your post better.
            </Form.Text>
            <div style={{marginTop: 30}}>
            <Form.Label>Include images (.png/.jpeg/.jpg only)</Form.Label>
            { this.state.isMounted && <Upload handleImages={this.handleImages} images={this.state.images} style={styles.images}/>}
            </div>
            <div style={{marginTop:20}}>
              <Row>
                <Col md="auto">
                  <Button onClick={this.onSubmit}>Post</Button>
                </Col>
                <Col md="auto">
                  <Button variant="warning" onClick={this.onCancel}>Cancel</Button>
                </Col>
              </Row>
            </div>
          </Form>
      </Container>
      </div>
    );
  }
}

const styles = {
  messageContainer:{
    padding: 30,
    backgroundColor: 'white',
    marginTop: 40,
    marginBottom: 40
  },
  images: {
    maxWidth: 400
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (PostForm);
