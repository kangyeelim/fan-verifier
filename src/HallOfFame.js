import React from 'react';
import { Container, ListGroup, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import NavBar from './component/NavBar';
import LoginNavBar from './component/LoginNavBar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { connect } from 'react-redux';
import auth from './services/auth';
import { Entry } from './component/SocialMediaEntry'; 

class HallOfFame extends React.Component {

  constructor() {
    super();
    this.state= {
      entries: null,
      isLoggedIn: false,
      keyword: "",
      filteredEntries: null,
    }
    this.handleKeywordInput = this.handleKeywordInput.bind(this);
    this.searchKeyword = this.searchKeyword.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
    axios.get('http://localhost:5000/hallOfFameEntries/')
      .then(response => {
        this.setState({ entries: response.data });
        this.setState({ filteredEntries: response.data});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  searchKeyword() {
    const filteredEntries = this.state.entries.filter(entry => {
      return (
        entry.name.includes(this.state.keyword) ||
        entry.social.includes(this.state.keyword)
      );
    });
    this.setState({filteredEntries: filteredEntries});
  }

  handleKeywordInput(e) {
    this.setState({keyword: e.currentTarget.value});
  }

  render() {
    return (
      <div>
      { this.props.profile.length === 1 && this.state.isLoggedIn && (
        <NavBar history={this.props.history}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar/>
      )
      }
      <Container>
        <Row>
          <Col>
            <h1 className="my-4">Hall of Fame</h1>
          </Col>
          <Col md="auto">
            <Form style={styles.form} inline>
             <FormControl onChange={this.handleKeywordInput} type="text" placeholder="Search" className="mr-sm-2" />
             <Button onClick={this.searchKeyword} variant="outline-success">Search</Button>
            </Form>
          </Col>
        </Row>
        {this.state.filteredEntries && (
          <ListGroup>
          {this.state.filteredEntries.map(entry => {
             return <Entry key={entry.social + entry.name} entry={entry}/>
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
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps, {}) (HallOfFame);
