const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  res.send("Getting users");
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//check if googleId exists in user db, if yes update
//if googleId do not exist, then add
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const googleId = req.body.googleId;
  const imageUrl = req.body.imageUrl;
  const tokenId = req.body.tokenId;

  var query = {};
  query["googleId"] = googleId;
  User.find(query)
    .then(users => {
      if (users.length === 0) {
        const userData = {
          name,
          email,
          googleId,
          imageUrl,
          tokenId
        }
        const newUser = new User(userData);

        newUser.save()
          .then(() => res.json('User added!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        User.findOne(query)
          .then(user => {
            user.name = name;
            user.email = email;
            user.googleId = googleId;
            user.imageUrl = imageUrl;
            user.tokenId = tokenId;

            user.save()
              .then(() => res.json('User updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
      }
    })
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.googleId = req.body.googleId;
      user.imageUrl = req.body.imageUrl;
      user.tokenId = req.body.tokenId;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/updateBy/:name/:value').post((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value
  User.findOne(query)
    .then(user => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.googleId = req.body.googleId;
      user.imageUrl = req.body.imageUrl;
      user.tokenId = req.body.tokenId;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
