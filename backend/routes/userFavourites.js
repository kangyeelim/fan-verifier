const router = require('express').Router();
let Favourite = require('../models/UserFavourite.model');

router.route('/').get((req, res) => {
  Favourite.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const googleId = req.body.googleId;

  var query = {};
  query["googleId"] = googleId;
  Favourite.find(query)
    .then(favourites => {
      if (favourites.length === 0) {
        const favData = {
          name,
          googleId
        }
        const newFavouriteData = new Favourite(favData);

        newFavouriteData.save()
          .then(() => res.json('Favourite Data Entry added!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        Favourite.findOne(query)
          .then(favourite => {
            favourite.name = name;

            favourite.save()
              .then(() => res.json('Favourite Data Entry updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Favourite.findById(req.params.id)
    .then(entry => res.json(entry))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/myfavourites/:id').get((req, res) => {
  var query = {};
  query['googleId'] = req.params.id;
  Favourite.find()
  .and(query)
  .then(entries => res.json(entries))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name/:value').get((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value;
  Favourite.find(query)
  .then(entries => res.json(entries))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Favourite.findById(req.params.id)
    .then(favourite => {
      favourite.postIds = req.body.postsIds,

      favourite.save()
        .then(() => res.json('Favourites updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateBy/:name/:value').post((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value
  Favourite.findOne(query)
    .then(favourite => {
      favourite.googleId = req.body.googleId;
      favourite.postIds = req.body.postIds;
      favourite.name = req.body.name;

      favourite.save()
        .then(() => res.json('Favourites updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
