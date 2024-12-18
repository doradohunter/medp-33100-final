var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const db = req.app.locals.db;
    const posts = await db.collection('Posts')
    .find()
    .toArray();

    res.render('index', {title: 'Sneaker Blog', posts: posts})
  } catch (error) {
  }
  res.render('index', { title: 'Express' });
});

module.exports = router;
