const router = require('express').Router();
const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

router.post('/upload', (req, res) => {
  const values = Object.values(req.files)
  const promises = values.map(image =>cloudinary.uploader.upload(image.path))

  Promise
    .all(promises)
    .then(results => res.json(results))
  })

  router.post('/delete', (req, res) => {
    const values = req.body.public_ids
    const promises = values.map(public_id =>cloudinary.uploader.destroy(public_id))

    Promise
      .all(promises)
      .then(results => res.json(results))
  })

  module.exports = router;
