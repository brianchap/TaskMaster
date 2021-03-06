var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var testAPIRouter = require('./routes/testAPI');
var invalidpwd = require('./routes/invalidpwd');
var signUpRouter = require('./routes/signup');
var calendarRouter = require('./routes/calendar');
var addTaskRouter = require('./routes/addTask');
var findTaskRouter = require('./routes/findTask');
var contributeTaskRouter = require('./routes/contributeTask');
var deleteTaskRouter = require('./routes/deleteTask');
var archiveRouter = require('./routes/archiveTask');
var dateRouter = require('./routes/getDate');
var forgotRouter = require('./routes/forgotPass');
var checkSARouter = require('./routes/checksa');
var pullRouter = require('./routes/pullTask');

var app = express();
app.use(session({secret: 'secretkey', saveUninitialized: true, resave: true, cookie: {maxAge: 60000}}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/invalidpwd', invalidpwd);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/calendar', calendarRouter);
app.use('/signup', signUpRouter);
app.use('/addTask', addTaskRouter);
app.use('/findTask', findTaskRouter);
app.use('/contributeTask', contributeTaskRouter);
app.use('/deleteTask', deleteTaskRouter);
app.use('/archiveTask', archiveRouter);
app.use('/getDate', dateRouter);
app.use('/forgotPass', forgotRouter);
app.use('/checksa', checkSARouter);
app.use('/pullTask', pullRouter);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
//  next(createError(404));
//});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
