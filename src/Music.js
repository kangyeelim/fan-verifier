import React from 'react';
import { Container, Row, Col, Image, Form, FormControl, Button } from 'react-bootstrap';
import LoginNavBar from './component/LoginNavBar';
import NavBar from './component/NavBar';
import auth from './services/auth';
import axios from 'axios';

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
      romLyrics: null
    }
    this.searchKorLyrics = this.searchKorLyrics.bind(this);
    this.searchRomLyrics = this.searchRomLyrics.bind(this);
    this.handleLyricsInput = this.handleLyricsInput.bind(this);
  }

  async componentDidMount() {
    if (await auth.isAuthenticated()) {
      this.setState({isLoggedIn: true});
    }
  }

  handleLyricsInput(e) {
    this.setState({song:e.currentTarget.value});
  }

  async searchKorLyrics() {
    try {
      const response = await fetch(`https://shazam.p.rapidapi.com/search?locale=en-US&offset=0&limit=5&term=bts ${this.state.song}`, {
      	"method": "GET",
      	"headers": {
      		"x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
      		"x-rapidapi-key": `${LYRICS_KEY}`
      	}
      });
      const firstResult = await response.json().hits[0];
      const title = firstResult.title;
      const artist = firstResult.subtitle;
      if (title.toLowerCase() != this.state.song.toLowerCase() || artist.toLowerCase() != 'bts') {
        this.setState({isNotFound:true});
      } else {
        const key = firstResult.key;
        const response = await fetch(`https://shazam.p.rapidapi.com/songs/get-details?locale=en-US&key=${key}`, {
          "method": "GET",
        	"headers": {
        		"x-rapidapi-host": "mourits-lyrics.p.rapidapi.com",
        		"x-rapidapi-key": `${LYRICS_KEY}`
        	}
        });
        const result = response.json();
        const obj = result.sections.filter(obj => {
          return obj.type == "LYRICS"
        })
        const lyrics = obj[0].text;
        this.setState({korLyrics:lyrics});
        this.setState({isKorLyricsFound:true});
      }
    } catch (error) {
      console.error(error);
    }
  }

  async searchRomLyrics() {
    try {
      console.log(`https://orion.apiseeds.com/api/music/lyric/bts/${this.state.song}?apikey=${LYRICS_KEY_ROM}`)
      const response = await fetch(`https://orion.apiseeds.com/api/music/lyric/bts/${this.state.song}?apikey=${LYRICS_KEY_ROM}`);
      console.log("here");
      const result = await response.json();
      console.log(result)
      const title = result.result.track.name;
      if (title.toLowerCase() != this.state.song.toLowerCase()) {
        this.setState({isNotFound:false})
      } else {
        const lyrics = result.result.track.text;
        this.setState({romLyrics:lyrics});
        this.setState({isRomLyricsFound:true});
      }
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
      { this.state.isLoggedIn && (
        <NavBar history={this.props.history}/>
      )}
      { !this.state.isLoggedIn && (
        <LoginNavBar/>
      )}
      <Container fluid style={styles.container}>
        <div>
        <h1>Discover BTS Music</h1>
        <Row>
        <Col md="auto">
        <h3>BTS Top 100 tracks</h3>
        <iframe scrolling="no"
          frameborder="0"
          allowTransparency="true"
          src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=7871175002&app_id=1"
          width="600"
          height="350">
        </iframe>
        <h3 style={styles.title}>Top Picks from BTS</h3>
        <iframe scrolling="no"
         frameborder="0"
         allowTransparency="true"
         src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id=4884313904&app_id=1"
         width="600"
         height="350">
        </iframe>
        <h3 style={styles.title}>Latest Album</h3>
        <iframe scrolling="no"
         frameborder="0"
         allowTransparency="true"
         src="https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=album&id=131916932&app_id=1"
         width="600"
         height="350">
        </iframe>
        <div style={styles.title}>
        <Button href="https://www.deezer.com/us/artist/6982223"type="primary">Hear more from BTS @deezer</Button>
        </div>
        </Col>
        <Col md="auto" xs={4}>
          <h3>Want to sing along?</h3>
          <p>Search for the korean hangul lyrics or romanized lyrics here.</p>
            <Form inline>
             <FormControl onChange={this.handleLyricsInput} type="text" placeholder="Search" className="mr-sm-2" />
             <Button onClick={this.searchKorLyrics} variant="outline-success">Search Kor</Button>
             <Button onClick={this.searchRomLyrics} variant="outline-success" style={styles.button}>Search Rom</Button>
            </Form>
            { (this.state.isKorLyricsNotFound || this.state.isRomLyricsNotFound) && (
              <p>Sorry the lyrics for that song could not be found. It may be updated in the database in the future. Do check back again in the future.
              In the meantime, you may have to search elsewhere.</p>
            )}
            { this.state.isKorLyricsFound && this.state.korLyrics && (
              <p>{this.state.korLyrics}</p>
            )}
            { this.state.isRomLyricsFound && this.state.romLyrics && (
              <h6>{this.state.romLyrics}</h6>
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
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 30
  },
  button: {
    marginLeft: 10
  }
}

export default Music;
