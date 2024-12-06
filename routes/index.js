var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  //GET entries
  try{
    const db = req.app.locals.db;
    const entries = await db.collection('entries')
      .find()
      .toArray()
      res.render('index', { entries:entries });

    } catch (error) {
      console.log(error)
    }
});

module.exports = router;
