var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

/* GET home page */
router.get('/', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const userId = req.cookies.userId;

    if (!userId) {
      return res.redirect('/users/login');
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.redirect('/users/login');
    }

    // Fetch all posts (memories) for the logged-in user
    const posts = await db.collection('memory').find({ userId: userId }).toArray();

    res.render('index', {
      title: 'My Memories',
      user: user,
      memory: posts,  
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});

/* POST add memory */
router.post('/add-memory', async function (req, res, next) {
  try {
    const db = req.app.locals.db;
    const userId = req.cookies.userId;
    const { title, author, date, description } = req.body;

    if (!userId) {
      return res.status(401).send('Unauthorized: Please log in to add memories');
    }

    const newMemory = { userId, title, author, date, description };
    await db.collection('memory').insertOne(newMemory);

    res.redirect('/');  // Redirect back to the home page after adding the memory
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
