import React from 'react';
import { Container, ListGroup, Row, Col, Form, FormControl, Button, Image, Carousel, Badge } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import axios from 'axios';
import { connect } from 'react-redux';
import auth from './services/auth';
import { FormOutlined } from '@ant-design/icons';
import { Entry } from './component/SocialMediaEntry';

export function ImageCarousel(props) {
    return (
      <Carousel style={styles.carousel}>
        {props.images.map(image => {
          return (
            <Carousel.Item key={image.public_id} style={{backgroundColor:'grey'}}>
            <img
              key={image.public_id}
              className="d-block w-100"
              src={image.secure_url}
              alt="Image"
              height="400"
              style={{width:"undefined", maxHeight: '100%', objectFit: "contain"}}
            />
          </Carousel.Item>);
        })}
      </Carousel>
    );
}
/*&& props.post.images.map(image => {
  return <Image src={image.secure_url} alt="Image" style={{maxWidth: 400}}/>
})*/
export function PostEntry(props) {
    return (
      <ListGroup.Item>
        <p>User {props.post.googleName} posted:</p>
        <h5>{props.post.title} <Badge variant="secondary">{props.post.tag}</Badge></h5>
        <h6>{props.post.description}</h6>
        { props.post.social !== "" && (
          <div style={{marginTop: 20}}>
          <p>DM me via</p>
          <Entry entry={props.post}/>
          </div>
        )}
        { props.post.images && <ImageCarousel images={props.post.images}/> }
        <p>posted on: {Date(props.post.date)}</p>
      </ListGroup.Item>
    );
}

class Community extends React.Component {

  constructor() {
    super();
    this.state= {
      isLoggedIn: false,
      filter: "",
      posts: null,
      filteredPosts: null
    }
    this.filter = this.filter.bind(this);
    this.handleFilterInput = this.handleFilterInput.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    const response = await axios.get('http://localhost:5000/posts/isPosted/true');
    const posts = await response.data;
    this.setState({filteredPosts:posts});
    this.setState({posts:posts});
  }

  async filter() {
    const response = await axios.get(`http://localhost:5000/posts/tag/${this.state.filter}`);
      const posts = await response.data;
      this.setState({filteredPosts:posts});
  }

  handleFilterInput(e) {
    this.setState({filter: e.target.value});
  }

  handleNewPost() {
    this.props.history.push("/createPost");
  }

  reset() {
    this.setState({filteredPosts: this.state.posts});
  }

  render() {
    return (
      <div>
      { this.props.profile.length === 1 && this.state.isLoggedIn && (
        <NavBar history={this.props.history}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar/>
      )}
      <Container style={styles.container}>
        <Row>
          <Col>
            <h1 className="my-4">Community</h1>
          </Col>
          <Col md={2}>
          </Col>
          <Col md="auto">
            <Form style={styles.form} inline>
             <FormControl as="select"
              custom
              id="tag"
              onChange={this.handleFilterInput}
              value={this.state.filter}
              className="mr-sm-2"
            >
               <option value="" disabled>Show posts that are</option>
               <option value="selling">Selling</option>
               <option value="buying">Buying</option>
               <option value="sharing">Sharing</option>
               <option value="others">Others</option>
              </FormControl>
             <Button onClick={this.filter} variant="outline-success">Filter</Button>
             <Button style={styles.icon} onClick={this.reset} variant="outline-success">Reset</Button>
             { this.state.isLoggedIn && (<Button style={styles.icon} onClick={this.handleNewPost} variant="outline-primary">Make New Post</Button>)}
            </Form>
          </Col>
        </Row>
        {this.state.filteredPosts && (
          <ListGroup>
          {this.state.filteredPosts.map(post => {
             return <PostEntry key={post._id} post={post}/>
          })}
          </ListGroup>
        )}
      </Container>
      </div>
  );
  }
}

const styles = {
  form: {
    marginTop: 40,
    alignSelf: 'right',
    marginBottom: 20
  },
  icon: {
    marginRight: 10,
    fontSize: 18
  },
  text: {
    fontSize: 16
  },
  icon: {
    marginLeft: 30
  },
  carousel: {
    marginBottom: 10,
    marginTop: 10
  },
  container: {
    marginBottom:30
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Community);
