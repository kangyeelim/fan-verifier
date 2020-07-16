const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  Post.find()
    .limit(2000)
    .sort({date: -1})
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Post.findById(req.params.id)
    .then(entry => res.json(entry))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/drafts/:id').get((req, res) => {
  var query = {};
  query['isPosted'] = false;
  var query2 = {};
  query2['googleId'] = req.params.id;
  Post.find()
  .and([query, query2])
  .limit(2000)
  .sort({date:-1})
  .then(entries => res.json(entries))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/myposts/:id').get((req, res) => {
  var query = {};
  query['isPosted'] = true;
  var query2 = {};
  query2['googleId'] = req.params.id;
  Post.find()
  .and([query, query2])
  .limit(2000)
  .sort({date:-1})
  .then(entries => res.json(entries))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name/:value').get((req, res) => {
  var query = {};
  query[req.params.name] = req.params.value;
  Post.find(query)
  .limit(2000)
  .sort({date:-1})
  .then(entries => res.json(entries))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name/:value/:name2/:value2').get((req, res) => {
  var query = {};
  query[req.params.name] = { $regex: req.params.value, $options: "i" };
  var query2 = {};
  query2[req.params.name2] = { $regex: req.params.value2, $options: "i" };
  Post.find()
  .or([query, query2])
  .limit(2000)
  .sort({date:-1})
  .then(entries => res.json(entries))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name/:value/:name2/:value2/:name3/:value3').get((req, res) => {
  var query = {};
  query[req.params.name] = { $regex: req.params.value, $options: "i" };
  var query2 = {};
  query2[req.params.name2] = { $regex: req.params.value2, $options: "i" };
  var query3 = {};
  query3[req.params.name3] = req.params.value3;
  Post.find()
  .or([query, query2, query3])
  .limit(2000)
  .sort({date:-1})
  .then(entries => res.json(entries))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/upload', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
    googleId: req.body.googleId,
    images: req.body.images,
    isPosted: req.body.isPosted,
    googleName: req.body.name,
    social: req.body.social,
    name: req.body.username,
    date: Date.now()
  })

  post.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update/:id').post((req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      post.title = req.body.title,
      post.description = req.body.description,
      post.tag = req.body.tag,
      post.images = req.body.images,
      post.isPosted = req.body.isPosted,
      post.social = req.body.social,
      post.name = req.body.username,
      post.date = Date.now()

      post.save()
        .then(() => res.json('Post updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
