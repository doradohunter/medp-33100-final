var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(req.app.locals.db){
    try{
      const db = req.app.locals.db;
      const reviews = await db.collection('Review')
      .aggregate([
        {
          $lookup: {
            from: 'Users',
            localField: '_id',
            foreignField: 'posts',
            as: 'author'
          }
        }
      ])
      .toArray();
      console.log(reviews[0])
      console.log(reviews[0].author)
      res.render('index', { title: 'Foodie Scribbles', reviews: reviews});
    } catch(error){
      console.log(error);
    }
  }
});

module.exports = router;
