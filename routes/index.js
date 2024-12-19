var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET home page. */
router.get('/', async function(req, res, next) {
  //GET entries
  try{
    const db = req.app.locals.db;
    const entries = await db.collection('entries')
      .aggregate([
        {
          $lookup: {
            from: 'stages'
            ,foreignField: '_id'
            ,localField: 'stageID'
            ,as: 'stage'
          }
        },
        {
          $lookup: {
            from: 'comments'
            ,foreignField: 'postID'
            ,localField: '_id'
            ,as: 'comment'
          }
        }
      ])
      .toArray()
      
      const stages = await db.collection('stages')
        .find()
        .toArray()
        
      res.render('index', { entries:entries, stages:stages });

    } catch (error) {
      console.log(error)
    }
});

module.exports = router;
