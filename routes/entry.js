var express = require('express');
const { ObjectId } = require('mongodb');
var router = express.Router();
const cloudinary = require('../config/cloudinary');
const uploadToCloudinary = require('../config/uploadToCloudinary');
const multer = require('multer');

/* POST entry. */
router.post('/', multer().single('image'), uploadToCloudinary, async function(req, res, next) {
  try{
    const db = req.app.locals.db;

    const newEntry = {
      name: req.body.name
      ,entry: req.body.entry
      ,mediaURL: req.file.cloudinaryUrl
      ,stageID: new ObjectId(req.body.stageID)
    }

    await db.collection('entries').insertOne(newEntry)
    res.send('Created new post');
    
  } catch (error) {
      next(error);
  }
});

// DELETE a posted plant
router.delete('/:id', async function (req, res) {
  try {
      const db = req.app.locals.db;

      await db.collection('entries')
          .deleteOne({_id: new ObjectId(req.params.id)});
      res.send('Successfully deleted');
  } catch (error) {
      next(error);
  }
})


//PUT updated posted plant entry  //SUCCESS BUT NOT WORKING?
router.put('/', async function(req,res,next){
  try{
      const db = req.app.locals.db;
      const post = req.body;
      
      await db.collection('entries')
          .updateOne({
            _id: new ObjectId(post.postID)
          }
          ,{ $set: {
              name: post.name
              ,entry: post.entry
              ,stageID: new ObjectId(post.stageID)
            } })

      res.send('Successfully updated');

  } catch (error) {
      next(error);
  }
})

module.exports = router;
