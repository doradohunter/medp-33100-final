var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {
    const db = req.app.locals.db;
    const entries = await db.collection('entries')
      .aggregate([
        {
          $lookup: {
            from: 'authors',
            localField: 'author',
            foreignField: '_id',
            as: 'author'
          }
        },
        {
          $lookup: {
            from: 'platforms',
            localField: 'platform',
            foreignField: '_id',
            as: 'platform'
          }
        }
      ])
      .toArray();
    const authors = await db.collection('authors').find().toArray();
    const platforms = await db.collection('platforms').find().toArray();

    res.render('index', { title: 'Gaming Journal', entries: entries, authors: authors, platforms: platforms});
  } catch (error) {
    console.log('error!');
    res.status(500).send('An error occurred');
  }


});

module.exports = router;