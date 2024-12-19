var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

// GET home page
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

router.get('/edit-memory/:id', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const userId = req.cookies.userId;
    const postId = req.params.id;

    if (!userId) {
      return res.redirect('/users/login');
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.redirect('/users/login');
    }

    const post = await db.collection('memory').findOne({ _id: new ObjectId(postId) });

    if (!post) {
      return res.redirect('/');
    }

    res.render('edit-memory', {
      title: 'Edit Memory',
      user: user,
      memory: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});

router.post('/edit-memory/:id', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const postId = req.params.id;
    const { title, author, date, description } = req.body;

    const updatedMemory = { title, author, date, description };

    const result = await db.collection('memory').updateOne(
      { _id: new ObjectId(postId) },
      { $set: updatedMemory }
    );

    if (result.modifiedCount === 1) {
      res.redirect('/');
    } else {
      res.status(400).send('Failed to update memory');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});

router.post('/delete-memory/:id', async function (req, res) {
  try {
    const db = req.app.locals.db;
    const postId = req.params.id;

    const result = await db.collection('memory').deleteOne({ _id: new ObjectId(postId) });

    if (result.deletedCount === 1) {
      res.redirect('/');
    } else {
      res.status(400).send('Failed to delete memory');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
