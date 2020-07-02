const passport = require('passport');
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  res.send("Getting users");
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const userData = {
    username,
    email
  }
  const newUser = new User(userData);

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
