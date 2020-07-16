import React from 'react';
import { Container, ListGroup, Row, Col, Form, FormControl,
  Button, Image, Carousel, Badge, Popover, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import axios from 'axios';
import { connect } from 'react-redux';
import auth from './services/auth';
import { FormOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import { Entry } from './component/SocialMediaEntry';

export function FilterPopover(props) {
  return (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Filter and Search</Popover.Title>
      <Popover.Content>
      <Form style={{margin: 20}}>
       <FormControl
        as="select"
        id="tag"
        onChange={props.handleFilterInput}
        value={props.filter}
        className="mr-sm-2"
        style={{marginBottom:20}}
        >
          <option value="">Show posts that are</option>
          <option value="selling">Selling</option>
          <option value="buying">Buying</option>
          <option value="sharing">Sharing</option>
          <option value="others">Others</option>
        </FormControl>
        <FormControl onChange={props.handleKeywordInput} value={props.keyword} type="text" placeholder="Keyword(s)" className="mr-sm-2" style={{marginBottom:20}}/>
        <Button onClick={props.apply} variant="outline-success">Apply</Button>
      </Form>
      </Popover.Content>
    </Popover>
  );
}

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
            height={props.height}
            style={{width:"undefined", maxHeight: '100%', objectFit: "contain"}}
          />
          </Carousel.Item>);
      })}
    </Carousel>
  );
}

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
        { props.post.images && (
          <div style={{display:"flex", flexDirection:"column"}}>
            <div style={{marginBottom:-30, zIndex:"50"}}>
            <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip>
                Show in fullscreen
              </Tooltip>
            }>

              <FullscreenOutlined onClick={()=> props.showImages(props.post.images)} style={styles.screenIcon}/>


            </OverlayTrigger>
            </div>
            <ImageCarousel images={props.post.images} height="400"/>
          </div>
        )}
        <p>posted on: {Date(props.post.date)}</p>
      </ListGroup.Item>
    );
}

const LinkFilterPopover = React.forwardRef((props, ref) => <FilterPopover innerRef={ref} {...props} />);

class Community extends React.Component {

  constructor() {
    super();
    this.state= {
      isLoggedIn: false,
      filter: "",
      posts: null,
      filteredPosts: null,
      keyword: "",
      isShowingImagesFull: false,
      imagesToShow: null
    }
    this.apply = this.apply.bind(this);
    this.handleFilterInput = this.handleFilterInput.bind(this);
    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleKeywordInput = this.handleKeywordInput.bind(this);
    this.reset = this.reset.bind(this);
    this.showImages = this.showImages.bind(this);
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

  async apply() {
    var posts = [];
    if (this.state.filter !== "" && this.state.keyword === "") {
      const response = await axios.get(`http://localhost:5000/posts/tag/${this.state.filter}`);
      posts = await response.data;
    } else if (this.state.filter === "" && this.state.keyword !== "") {
      const response = await axios.get(`http://localhost:5000/posts/title/${this.state.keyword}/description/${this.state.keyword}`);
      posts = await response.data;
    } else if (this.state.filter !== "" && this.state.keyword !== "") {
      const response = await axios.get(`http://localhost:5000/posts/title/${this.state.keyword}/description/${this.state.keyword}/tag/${this.state.filter}`);
      posts = await response.data;
    } else {
      posts = this.state.posts;
    }
    this.setState({filteredPosts:posts});
  }

  handleFilterInput(e) {
    this.setState({filter: e.target.value});
  }

  handleNewPost() {
    this.props.history.push("/createPost");
  }

  handleKeywordInput(e) {
    this.setState({keyword:e.currentTarget.value});
  }

  reset() {
    this.setState({filteredPosts: this.state.posts});
    this.setState({keyword:""});
    this.setState({filter:""})
  }

  showImages(images) {
    this.setState({isShowingImagesFull:!this.state.isShowingImagesFull});
    this.setState({imagesToShow:images});
  }

  render() {
    if (this.state.isShowingImagesFull) {
      return (
        <div style={{display:"flex", flexDirection:"column"}}>
        <div style={{marginBottom:-40, zIndex:"50"}}>
        <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip>
            Exit fullscreen
          </Tooltip>
        }>
          <FullscreenExitOutlined onClick={() => this.showImages(null)} style={styles.screenIcon}/>
        </OverlayTrigger>
        </div>
        {this.state.imagesToShow && (
          <ImageCarousel images={this.state.imagesToShow} height="700"/>
        )}
        </div>
      );
    }
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
          <Col md="auto" style={{padding:10}}>
            <>
            <OverlayTrigger
            trigger="click"
            placement="right"
            overlay={
              <div style={{width:400}}>
              <LinkFilterPopover
              apply={this.apply}
              handleFilterInput={this.handleFilterInput}
              handleKeywordInput={this.handleKeywordInput}
              filter={this.state.filter}
              keyword={this.state.keyword}/>
              </div>
            }>
              <Button style={styles.form} variant="outline-success">Filters</Button>
            </OverlayTrigger>
            </>
            <Button style={styles.icon} onClick={this.reset} variant="outline-success">Clear Filters</Button>
            { this.state.isLoggedIn && (<Button style={styles.icon} onClick={this.handleNewPost} variant="outline-primary">Make New Post</Button>)}
          </Col>
        </Row>
        {this.state.filteredPosts && (
          <ListGroup>
          {this.state.filteredPosts.map(post => {
             return <PostEntry key={post._id} post={post} showImages={this.showImages}/>
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
    marginTop: 20,
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
  },
  screenIcon: {
    fontSize: 20,
    marginTop: 20,
    alignSelf: 'right',
    color: 'white'
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (Community);
