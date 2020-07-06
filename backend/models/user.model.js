const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    googleId: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String
    },
    tokenId: {
      type: String,
      required: true
    }
}, {
  timestamp: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
