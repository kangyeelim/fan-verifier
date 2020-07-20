const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userFavouriteSchema = new Schema({
  name: {
      type: String,
      required: true
    },
    googleId: {
      type: String,
      required: true
    },
    postIds: {
      type: Array,
      default: []
    }
}, {
  timestamp: true,
});

const UserFavourite = mongoose.model('UserFavourite', userFavouriteSchema);

module.exports = UserFavourite;
