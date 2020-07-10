const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {type: String, required: true},
  options: {type: Array, required: true},
  answer: {type: Number, required: true},
}, {
  timestamp: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
