let Post = require('../models/post.model');
let Favourite = require('../models/UserFavourite.model');

module.exports = function (postId, res) {
    var favouritedBy = [];
    Post.findById(postId)
      .then(post => {
        favouritedBy = post.favouritedBy;
      })
      .catch(err => res.status(400).json('Error: ' + err));
    Post.findByIdAndDelete(postId)
      .then(() => res.json('Post not allowed and deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
    for (var i =0 ; i < favouritedBy.length; i++) {
      Favourite.findOne({googleId:favouritedBy[i]})
        .then(favourite => {
          var newArray = favourite.postIds.filter(id=> id !== postId);
          favourite.postIds = newArray;

          favourite.save()
            .then(() => res.json('Favourites updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
      }
}
