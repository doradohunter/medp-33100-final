var express = require('express');
var router = express.Router();

/* GET intro page */
router.get('/', function (req, res, next) {
  res.render('intro', {
    title: 'Welcome to My Memories',
  });
});

module.exports = router;
