const router = require('express').Router();
let Post = require('../models/post.model');

router.post('/upload', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
    googleId: req.body.googleId,
    images: req.body.images,
    time: Date.now()
  })

  post.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.delete('/delete', (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('Post deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
