var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const bodyParser = require('body-parser');
//const user = require("../models/user");


var app = express();

/* Allow CORS */
app.use(cors({
  origin: ['*'],
  handlePreflightRequest: (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "https://example.com",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "my-custom-header",
      "Access-Control-Allow-Credentials": false
    });
    res.end();
  }
}));

var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');



require('./passport')
var config = require('./config');




var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var taskRouter = require('./routes/task');
//var usersRouter = require('./routes/users');
// mongodb+srv://<username>:<password>@cluster0.s6launr.mongodb.net/?retryWrites=true&w=majority

// mongoose.connect('mongodb+srv://martinlubowa:jesus147852@cluster0.s6launr.mongodb.net/codeshare?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error', err);
//   });

 //mongodb+srv://doadmin:b5pY139Jd84Rc26f@codeshare-0b216bb9.mongo.ondigitalocean.com/admin
 //mongodb+srv://joseph:masterjesus23@cluster0.s6launr.mongodb.net/codeshare

  mongoose.connect( "mongodb://martinlubowa:jesus147852@ac-g5nl3pm-shard-00-00.s6launr.mongodb.net:27017,ac-g5nl3pm-shard-00-01.s6launr.mongodb.net:27017,ac-g5nl3pm-shard-00-02.s6launr.mongodb.net:27017/codeshare?ssl=true&replicaSet=atlas-uj3q0z-shard-0&authSource=admin&retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
  retryWrites: false,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });


global.User = require('./models/user');
global.Task = require('./models/task');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());





app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.text());


app.use(session({
  secret: 'codeAfrica',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user
  };
  next();
})




app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', taskRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
