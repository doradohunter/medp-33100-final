var express = require('express');
const { format } = require('morgan');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {

  try {
    const db = req.app.locals.db;
    const entries = await db.collection('entries')
      .aggregate([
        {
          $sort: {
            date_created: -1
          }
          
        },
        {
          $project: {
            date_created: { $toDate: "$date_created" },
            date_created: {$dateToString: {format: '%b %d %Y', date: '$date_created'}},
            game_name: 1,
            author: 1,
            image_url: 1,
            platform: 1,
            entry_text: 1
          }
        }
        
      ])
      .toArray();

    res.render('index', { title: 'gaming journal', entries: entries});
  } catch (error) {
    console.log('error!');
    res.status(500).send('An error occurred');
  }
});

module.exports = router;