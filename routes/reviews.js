var express = require('express');
var router = express.Router();
const {ObjectId} = require('mongodb');

router.delete('/:reviewId', async function (req, res) {
    console.log(req.body);
    try {
      const db = req.app.locals.db;
      const reviewId = req.params.reviewId;
  
      await db.collection('Review')
          .deleteOne({ _id: new ObjectId(reviewId)})
        
      res.send('Sucessfully deleted Review')
    } catch(error){
      console.log(error)
    }
  })
  module.exports = router;
