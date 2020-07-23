import React from 'react';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import NavBar from './component/NavBar';
import auth from './services/auth';
import { LoadingOutlined } from '@ant-design/icons';
import { Spring, Transition, animated } from 'react-spring/renderprops';

const LYRICS_KEY = process.env.REACT_APP_LYRICS_API_KEY;
const LYRICS_KEY_ROM = process.env.REACT_APP_LYRICS_API_KEY_ROM;

class Music extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      link: null,
      picture: null,
      song: null,
      isKorLyricsFound: false,
      isKorLyricsNotFound: false,
      isRomLyricsFound: false,
      isRomLyricsNotFound: false,
      korLyrics:null,
      romLyrics: null,
      engTransEmbedContent: null,
      isLoading: false,
    }
    this.searchKorLyrics = this.searchKorLyrics.bind(this);
    this.searchRomLyrics = this.searchRomLyrics.bind(this);
    this.handleLyricsInput = this.handleLyricsInput.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.getEnglishTrans = this.getEnglishTrans.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
  }

  handleLyricsInput(e) {
    this.setState({song:e.currentTarget.value});
  }

  resetSearch() {
    this.setState({
      isKorLyricsFound: false,
      isRomLyricsFound: false,
      isRomLyricsNotFound: false,
      isKorLyricsNotFound: false,
      korLyrics: null,
      romLyrics: null
    })
  }

  async getEnglishTrans() {
    const formatInput = this.state.song.replace(/ /g, "%20");
    const response = await fetch(`https://genius.p.rapidapi.com/search?q=BTS%20${formatInput}`, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "genius.p.rapidapi.com",
    		"x-rapidapi-key": `${LYRICS_KEY}`
    	}
    })
    const result = await response.json();
    const songId = result.response.hits[0].result.id;
    const response1 = await fetch(`https://genius.p.rapidapi.com/songs/${songId}`, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "genius.p.rapidapi.com",
    		"x-rapidapi-key": `${LYRICS_KEY}`
    	}
    })
    const result1 = await response1.json();
    const embedContent = result1.response.song.embed_content;
    this.setState({engTransEmbedContent:embedContent});
  }

  async searchKorLyrics() {
    this.setState({isLoading: true});
    this.resetSearch();
    try {
      const response = await fetch(`https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=bts ${this.state.song}`, {
      	"method": "GET",
      	"headers": {
      		"x-rapidapi-host": "shazam.p.rapidapi.com",
      		"x-rapidapi-key": `${LYRICS_KEY}`
      	}
      });
      const result = await response.json();
      const title = result.tracks.hits[0].track.title;
      const artist = result.tracks.hits[0].track.subtitle;
      const key = result.tracks.hits[0].track.key;
      if (!artist.toLowerCase().includes('bts')
      || !title.toLowerCase().includes(this.state.song.toLowerCase())
      || !this.state.song.toLowerCase().includes(title.toLowerCase())) {
        this.setState({isLoading:false});
        this.setState({isNotFound:true});
      } else {
        const response = await fetch(`https://shazam.p.rapidapi.com/songs/get-details?locale=en-US&key=${key}`, {
          "method": "GET",
        	"headers": {
        		"x-rapidapi-host": "shazam.p.rapidapi.com",
        		"x-rapidapi-key": `${LYRICS_KEY}`
        	}
        });
        const result = await response.json();
        const obj = result.sections.filter(obj => {
          return obj.type == "LYRICS"
        })
        const lyrics = obj[0].text;
        this.getEnglishTrans();
        this.setState({isLoading:false});
        this.setState({korLyrics:lyrics});
        this.setState({isKorLyricsFound:true});
      }
    } catch (error) {
      this.setState({isLoading:false});
      this.setState({isKorLyricsNotFound:true});
      console.error(error);
    }
  }

  async searchRomLyrics() {
    this.setState({isLoading:true});
    this.resetSearch();
    try {
      const response = await fetch(`https://orion.apiseeds.com/api/music/lyric/bts/${this.state.song}?apikey=${LYRICS_KEY_ROM}`);
      const result = await response.json();
      const title = result.result.track.name;
      const artist = result.result.artist.name;
      if (!title.toLowerCase().includes(this.state.song.toLowerCase())
      || !this.state.song.toLowerCase().includes(title.toLowerCase())
      || !artist.toLowerCase().includes('bts')) {
        this.setState({isLoading:false});
        this.setState({isRomLyricsNotFound:true});
      } else {
        const lyrics = result.result.track.text.split("\n");
        this.getEnglishTrans();
        this.setState({isLoading:false});
        this.setState({romLyrics:lyrics});
        this.setState({isRomLyricsFound:true});
      }
    } catch(error) {
      this.setState({isLoading:false});
      this.setState({isRomLyricsNotFound:true});
      console.error(error);
    }
  }

  render() {
    return (
      <div>
      { this.state.isLoggedIn && (
        <NavBar history={this.props.history} activeKey={3}/>
      )}
      { !this.state.isLoggedIn && (
        <LoginNavBar activeKey={3}/>
      )}
      <Container>
        <div>
        <Transition
          items={true}
          from={{ transform: 'translate3d(-300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
          {show => (props) => <animated.div style={props}>
            <h1 className="my-4">Discover BTS Music</h1>
          </animated.div>
          }
        </Transition>
        <Row>
        <Transition
          items={true}
          from={{ transform: 'translate3d(-300px,0,0)' }}
          enter={{ transform: 'translate3d(0px,0,0)' }}
          leave={{ opacity:0 }}
        >
        {show => (props) => <animated.div style={props}>
        <Col md={8}>
        <h3>BTS Top 100 tracks</h3>
        <p>Make sure you are signed in to Deezer to enjoy this.</p>
        <iframe scrolling="no"
          frameBorder="0"
          allowtransparency="true"
          src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=600&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=7871175002&app_id=1"
          width="600"
          height="350">
        </iframe>
        <h3 style={styles.title}>Top Picks from BTS</h3>
        <p>Make sure you are signed in to Deezer to enjoy this.</p>
        <iframe scrolling="no"
         frameBorder="0"
         allowtransparency="true"
         src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=4884313904&app_id=1"
         width="600"
         height="350">
        </iframe>
        <h3 style={styles.title}>Latest Album</h3>
        <p>Make sure you are signed in to Deezer to enjoy this.</p>
        <iframe scrolling="no"
         frameBorder="0"
         allowtransparency="true"
         src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id=131916932&app_id=1"
         width="600"
         height="350">
        </iframe>
        <div style={styles.visit}>
        <Button href="https://www.deezer.com/us/artist/6982223"type="primary">Hear more from BTS @deezer</Button>
        </div>
        </Col>
        </animated.div>
        }
        </Transition>

        <Col md={4} style={{minWidth: 350}}>
          <Transition
            items={true}
            from={{ transform: 'translate3d(300px,0,0)' }}
            enter={{ transform: 'translate3d(0px,0,0)' }}
            leave={{ opacity:0 }}
          >
        {show => (props) => <animated.div style={props}>
          <h3>Want to sing along?</h3>
          <p>Search for the korean hangul lyrics or romanized lyrics here.</p>
            <Form inline>
            <div style={{display:'flex'}}>
             <FormControl onChange={this.handleLyricsInput} type="text" placeholder="Search" className="mr-sm-2" />

             <Button onClick={this.searchKorLyrics} variant="outline-success">Kor</Button>
             <Button onClick={this.searchRomLyrics} variant="outline-success" style={styles.button}>Rom</Button>
             </div>
            </Form>
          </animated.div>
          }
          </Transition>
            { this.state.isLoading && <LoadingOutlined style={styles.loading}/>}
            { (this.state.isKorLyricsNotFound || this.state.isRomLyricsNotFound) && (
              <p style={styles.visit}>Sorry the lyrics for that song could not be found. It may be updated in the database in the future. Do check back again in the future.
              In the meantime, you may have to search elsewhere.</p>
            )}
            { this.state.isKorLyricsFound && this.state.korLyrics && (
              <div style={styles.visit}>
                { this.state.korLyrics.map(line => {
                  return <p>{line}</p>
                })}
                <div
                  dangerouslySetInnerHTML={{__html:this.state.engTransEmbedContent }}>
                </div>
              </div>
            )}
            { this.state.isRomLyricsFound && this.state.romLyrics && (
              <div style={styles.visit}>
                { this.state.romLyrics.map(line => {
                  return <p>{line}</p>
                })}
                <div
                  dangerouslySetInnerHTML={{__html:this.state.engTransEmbedContent }}>
                </div>
              </div>
            )}
        </Col>
        </Row>
        </div>
      </Container>
    </div>
  );
  }
}

const styles = {
  container: {
    marginTop: 30
  },
  title: {
    marginTop: 30
  },
  button: {
    marginLeft: 10,
  },
  visit: {
    marginTop: 30,
    marginBottom: 30,
  },
  loading: {
    margin: 30,
  }
}

export default Music;
