const router = require('express').Router();
var natural = require('natural');
var sentenceTokenizer = new natural.SentenceTokenizer();
const toxicity = require('@tensorflow-models/toxicity');
require('@tensorflow/tfjs-node');
const deletePostFromCommunity = require('./deletePostFromCommunity');

router.route('/check/:postId').post((req, res) => {
  var postId = req.params.postId;
  var title = req.body.title;
  var input = req.body.description;
  var titleSentences = sentenceTokenizer.tokenize(title);
  var inputSentences = sentenceTokenizer.tokenize(input);
  var sentences = titleSentences.concat(inputSentences);
  console.log(titleSentences);
  console.log(inputSentences);
  const threshold = 0.9;

  toxicity.load(threshold)
  .then(model => {
      // Now you can use the `model` object to label sentences.
      var isOffensiveLanguageFound = false;
      model.classify(sentences).then(predictions => {
        for (var i =0; i < 7; i++) {
          console.log(predictions[i].results);
          for (var j = 0; j < sentences.length; j++) {
            console.log(predictions[i].results[j]);
            if (predictions[i].results[j].match) {
              isOffensiveLanguageFound = true;
              break;
            }
          }
          if (isOffensiveLanguageFound) {
            break;
          }
        }
        if (isOffensiveLanguageFound) {
          deletePostFromCommunity(postId, res);
        } else {
          res.json("Allowed");
        }
      });
  })
  .catch(err => res.json(err));

});

module.exports = router;
