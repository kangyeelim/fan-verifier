const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {type: String, length: 155, required: true},
  description: {type: String, length: 600, required: true},
  tag: {type: String, required: true},
  googleId: {type: String, required: true},
  images: {type: Array, required: false},
  time: {type: String, required: true}
}, {
  timestamp: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
