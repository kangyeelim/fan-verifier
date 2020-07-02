const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    facebookId: {
      type: String,
      required: true
    }
}, {
  timestamp: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
