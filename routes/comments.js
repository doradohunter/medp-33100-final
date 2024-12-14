var express = require('express');
const { ObjectId, Timestamp } = require('mongodb');
var router = express.Router();

/* POST Comment. */
router.post('/', async function(req, res, next) {
    try{
      const db = req.app.locals.db;
      const comment = req.body;

      const post_comment = {
        postID: new ObjectId(comment.postID)
        ,text: comment.text
      }
  
      await db.collection('comments').insertOne(post_comment)
      res.send('Created new post');
      
    } catch (error) {
        next(error);
    }
});

// DELETE comment
router.delete('/:id', async function (req, res) {
  try {
      const db = req.app.locals.db;

      await db.collection('comments')
          .deleteOne({_id: new ObjectId(req.params.id)});
      res.send('Successfully deleted');
  } catch (error) {
      next(error);
  }
})

module.exports = router;
