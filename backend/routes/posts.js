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
  query[req.params.name] = req.params.value;
  query[req.params.name2] = req.params.value2;
  Post.find(query)
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
    time: Date.now()
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
      post.time = Date.now()

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
