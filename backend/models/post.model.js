const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {type: String, length: 155, required: false},
  description: {type: String, length: 600, required: false},
  tag: {type: String, required: false},
  googleId: {type: String, required: true},
  images: {type: Array, required: false},
  isPosted: {type: Boolean, required: true},
  googleName: {type: String, required: true},
  social: {type: String, required: false},
  name: {type: String, required: false},
  favouritedBy: {type: Array, default: []},
  postedAt: {type: Date, default: Date.now}
}, {
  timestamp: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
