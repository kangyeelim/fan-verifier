const router = require('express').Router();
let Question = require('../models/question.model');

router.route('/').get((req, res) => {
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const question = req.body.question;
  const options = req.body.options;
  const answer = Number(req.body.answer);

  const newQuestion = new Question({
    question,
    options,
    answer,
  });

  newQuestion.save()
  .then(() => res.json('Question added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.json('Question deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Question.findById(req.params.id)
    .then(question => {
      question.question = req.body.question;
      question.options = req.body.options;
      question.answer = Number(req.body.answer);

      question.save()
        .then(() => res.json('Question updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
