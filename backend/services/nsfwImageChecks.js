const router = require('express').Router();
const axios = require('axios');
const tf = require('@tensorflow/tfjs-node');
const nsfw = require('nsfwjs');
const deletePostFromCommunity = require('./deletePostFromCommunity');

router.route('/check/:postId').post( async (req, res) => {
  const postId = req.params.postId;
  const isObscene = false;
  const images = req.body.images;
  try {
    for (var i = 0; i < images.length; i++) {
      const pic = await axios.get(images[i].secure_url, {
        responseType: 'arraybuffer',
      })
      const model = await nsfw.load();

      const image = await tf.node.decodeImage(pic.data, 3);

      const predictions = await model.classify(image, 3);

      image.dispose();

      console.log(predictions);

      if (!(predictions[0].className === "Neutral" || predictions[0].className === "Drawing") && predictions[0].probability > 0.49) {
        isObscene = true;
        break;
      }
      if (isObscene) {
        deletePostFromCommunity(postId, res);
      } else {
          res.json("Allowed");
      }
    }
  } catch (err) {
    res.json(err);
  }

});

module.exports = router;
