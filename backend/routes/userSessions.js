const router = require('express').Router();
let Session = require('../models/userSession.model');

//get all sessions
router.route('/').get((req, res) => {
  Session.find()
    .then(sessions => res.json(sessions))
    .catch(err => res.status(400).json('Error: ' + err));
});

//check if value exist in collections
function isValueInCollections(name, value, res) {
  var query = {};
  query[name] = value;
  Session.find(query)
    .then(sessions => {
      if (sessions.length == 0) {
        return false;
      } else {
        console.log("session alr exist");
        return true;
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

//add a new session
//check if googleId has corresponding token, if yes update
//if googleId no corresponding token, then added
router.route('/add').post((req, res) => {
  const googleId = req.body.googleId;
  const tokenId = req.body.tokenId;

  //googleId does not exist so add new session
  if (!isValueInCollections("googleId", googleId, res)) {
    const newSession = new Session({
      googleId,
      tokenId
    });

    newSession.save()
    .then(() => res.json('Session added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  //googleId exists so update session
  } else {
    console.log("should be here");
    var query = {};
    query["googleId"] = googleId;
    Session.findOne(query)
      .then(session => {
        session.googleId = googleId;
        session.tokenId = tokenId;

        session.save()
          .then(() => res.json('Existing session token updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

//get session by id
router.route('/:id').get((req, res) => {
  Session.findById(req.params.id)
    .then(session => res.json(session))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete session by id
router.route('/:id').delete((req, res) => {
  Session.findByIdAndDelete(req.params.id)
    .then(() => res.json('Session deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete session by the variable name of certain value
router.route('/:name/:value').delete((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value;
  Session.deleteOne(query)
    .then(() => res.json('Session deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update existing session by id
router.route('/update/:id').post((req, res) => {
  Session.findById(req.params.id)
    .then(session => {
      session.googleId = req.body.googleId;
      session.tokenId = req.body.tokenId;

      session.save()
        .then(() => res.json('Session updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//update existing session by using variable name of certain value
router.route('/updateBy/:name/:value').post((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value
  Session.findOne(query)
    .then(session => {
      session.googleId = req.body.googleId;
      session.tokenId = req.body.tokenId;

      session.save()
        .then(() => res.json('Session updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
