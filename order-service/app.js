var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/node-microservices');
mongoose.set('debug', true);


var indexRouter = require('./routes/index');
var cartRouter = require('./routes/cart');
var orderRouter = require('./routes/order');
const { UnauthorizedError } = require('express-jwt');

var app = express();

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
app.use('/carts', cartRouter);
app.use('/orders', orderRouter);
// catch 404 and forward to error handler


app.use((err, req, res, next) => {
  console.error("Status Code " + res.statusCode)
  if(err instanceof UnauthorizedError) {
    res.status(401).json({error: err.message})
  }

  console.error(err.stack)
  res.status(400).json({error: err.message})
})

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
