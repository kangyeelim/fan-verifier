const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
  googleId: {
      type: String,
      required: true
    },
    tokenId: {
      type: String,
      required: true
    }
}, {
  timestamp: true,
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;
