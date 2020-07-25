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
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';
import { Spring, Transition, animated } from 'react-spring/renderprops';

const cache = new CellMeasurerCache({
    fixedWidth: true
  });

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
    this.renderRow = this.renderRow.bind(this);
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
        console.error(error);
      })
  }

  renderRow({ index, key, parent, style }) {
    var entry = this.state.filteredEntries[index];
    return (
      <CellMeasurer
        rowIndex={index}
        columnIndex={0}
        key={key}
        cache={cache}
        parent={parent}
        enableMargins
      >
        <Entry entry={entry}/>
      </CellMeasurer>
    )
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
        <NavBar history={this.props.history} activeKey={2}/>
      )}
      { this.props.profile.length !== 1 && !this.state.isLoggedIn && (
        <LoginNavBar activeKey={2}/>
      )
      }
      <Container>
        <Row>
          <Col>
          <Transition
            items={true}
            from={{ transform: 'translate3d(-300px,0,0)' }}
            enter={{ transform: 'translate3d(0px,0,0)' }}
            leave={{ opacity:0 }}
          >
          {show => (props) => <animated.div style={props}>
            <h1 className="my-4">Hall of Fame</h1>
            </animated.div>
          }
          </Transition>
          </Col>
          <Col md="auto">
          <Spring
            config={{duration:1000}}
            from={{ opacity: 0 }}
            to={{ opacity: 1 }}>
            {props => <div style={props}>
              <Form style={styles.form} inline>
               <FormControl onChange={this.handleKeywordInput} type="text" placeholder="Search" className="mr-sm-2" />
               <Button onClick={this.searchKeyword} variant="outline-success">Search</Button>
              </Form>
            </div>}
          </Spring>
          </Col>
        </Row>
        {this.state.filteredEntries && (
          <WindowScroller>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <ListGroup>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    height={height}
                    width={width}
                    deferredMeasurementCache={cache}
                    isScrolling={isScrolling}
                    rowCount={this.state.filteredEntries.length}
                    rowHeight={cache.rowHeight}
                    rowRenderer={this.renderRow}
                    autoHeight
                    scrollTop={scrollTop}
                    onChildScroll={onChildScroll}
                  />
                )}
              </AutoSizer>
            </ListGroup>
          )}
        </WindowScroller>
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
