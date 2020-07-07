const router = require('express').Router();
let Entry = require('../models/HallOfFameEntry.model');

router.route('/').get((req, res) => {
  Entry.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const googleId = req.body.googleId;
  const social = req.body.social;
  const name = req.body.name;

  console.log("here")

  var query = {};
  query["googleId"] = googleId;
  Entry.find(query)
    .then(entries => {
      if (entries.length === 0) {
        console.log("should be here")
        const newEntry = new Entry({
          social,
          name,
          googleId,
        });
        console.log("here2")
        newEntry.save()
        .then(() => res.json('Entry added!'))
        .catch(err => res.status(400).json('Error: ' + err));
      } else {
        Entry.findOne(query)
          .then(entry => {
            entry.name = name;
            entry.social = social;
            entry.googleId = googleId;

            entry.save()
              .then(() => res.json('Entry updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Entry.findById(req.params.id)
    .then(entry => res.json(entry))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Entry.findByIdAndDelete(req.params.id)
    .then(() => res.json('Entry deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name/:value').delete((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value;
  Entry.deleteOne(query)
    .then(() => res.json("Entry deleted."))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
  Entry.findById(req.params.id)
    .then(entry => {
      entry.googleId = req.body.googleId;
      entry.social = req.body.social;
      entry.name = req.body.name;

      entry.save()
        .then(() => res.json('Entry updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateBy/:name/:value').post((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value
  Entry.findOne(query)
    .then(entry => {
      entry.googleId = req.body.googleId;
      entry.social = req.body.social;
      entry.name = req.body.name;

      entry.save()
        .then(() => res.json('Entry updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;