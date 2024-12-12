var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const memories = await db
      .collection('memories')
      .aggregate([
        {
          $lookup: {
            from: 'users',
            foreignField: '_id',
            localField: 'authorId',
            as: 'author',
          },
        },
      ])
      .toArray();

    res.render('index', { title: 'Express', memories: memories });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
