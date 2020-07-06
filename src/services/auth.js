import { getFromStorage,
  setInStorage,
  removeFromStorage } from './Storage';
import axios from 'axios';

class Auth {
  removeTokenOnLogout(tokenId) {
    axios.delete(`http://localhost:5000/sessions/tokenId/${tokenId}`)
      .then(response => {
        console.log("Removed token from database");
      })
      .catch(err => {
        console.err(err);
      })
  }

  logout(cb) {
    const tokenId = getFromStorage("tokenId");
    removeFromStorage("tokenId")
    this.removeTokenOnLogout(tokenId);
    cb();
  }

  isTokenStored(tokenId) {
    axios.get('http://localhost:5000/sessions/')
      .then(response => {
        var tokens = response.data;
        var token = tokens.filter(obj => obj.tokenId == tokenId)
        console.log(token.length);
        if (token.length === 0) {
          return false;
        } else {
          return true;
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  isAuthenticated() {
    if (getFromStorage("tokenId") != null) {
      /*const tokenId = getFromStorage("tokenId");
      console.log(tokenId);
      if (this.isTokenStored(tokenId)) {
        return true;
      } else {
        return false;
      }*/
      return true;
    } else {
      return false;
    }
  }

  updateSessionTokenOnLogin(response) {
    axios.post('http://localhost:5000/sessions/add', {
      googleId: response.googleId,
      tokenId: response.tokenId
    })
      .then(res => {
        console.log("Added/Updated token into sessions database");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateUserInfoOnLogin(response) {
    axios.post('http://localhost:5000/users/add', {
      name:response.profileObj.name,
      email:response.profileObj.email,
      googleId:response.googleId,
      imageUrl:response.profileObj.imageUrl,
      tokenId: response.tokenId
    })
      .then(res => {
        console.log("Added/Updated user into database");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(response) {
    this.updateSessionTokenOnLogin(response);
    setInStorage("tokenId", response.tokenId);
    this.updateUserInfoOnLogin(response);
  }
}

export default new Auth();
