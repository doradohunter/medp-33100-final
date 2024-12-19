var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectToDatabase = require('./config/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Connect to the database
connectToDatabase().then((client) => {
  app.locals.db = client.db();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // Use the routers
  app.use('/', indexRouter);
  app.use('/users', usersRouter);

  // Ensure users are logged in before accessing the homepage
  app.use(function (req, res, next) {
    const userId = req.cookies.userId;

    // If not logged in and accessing non-login/signup pages, redirect to login
    if (!userId && req.originalUrl !== '/users/login' && req.originalUrl !== '/users/signup') {
      return res.redirect('/users/login');
    }
    next();
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });
}).catch((error) => {
  console.error("Failed to connect to the database:", error);
});

module.exports = app;
