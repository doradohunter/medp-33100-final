var express = require('express');
var router = express.Router();

// GET login page - Render login form
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const db = req.app.locals.db;

    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.render('login', { error: 'User not found' });
    }

    if (user.password !== password) {
      return res.render('login', { error: 'Invalid credentials' });
    }

    // Set the userId in a cookie to keep the user logged in
    res.cookie('userId', user._id.toString(), { httpOnly: true, secure: false });
    res.send('Login successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const db = req.app.locals.db;

    if (!username || !password) {
      return res.render('signup', { error: 'Username and password are required' });
    }

    // Check if the username already exists
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.render('signup', { error: 'Username already exists' });
    }

    // Save new user to the database
    const newUser = { username, password };
    const result = await db.collection('users').insertOne(newUser);

    if (result.acknowledged) {
      // Redirect to login page after successful sign up
      res.redirect('/users/login');
    } else {
      res.render('signup', { error: 'Failed to create user' });
    }
  } catch (error) {
    console.error('Sign-up error:', error.message);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
