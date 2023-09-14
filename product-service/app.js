var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var fileUpload = require('express-fileupload')
const { UnauthorizedError } = require('express-jwt');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var productRouter = require('./routes/products');
var app = express();


const getDb = require('./config/db')

const connectToDB = () => {
  console.log(new Date() + " : <<< Trying to connect >>> ");
  getDb().then(conn => {
    console.log(new Date() + " : <<< DB Connected >>>");
    
    console.log(process.env.MONGO_URI || 'mongodb://localhost/node-microservices');
    // mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/node-microservices');
    mongoose.set('debug', true);
    clearTimeout();
    
  }).catch((e) => {
    console.log(new Date() + " : <<< Got Connection Error >>>");
    console.log(e);
    setTimeout(() => {
      connectToDB();
    
    }, 10000);

  });
}

connectToDB();

app.use('/', indexRouter);
app.use('/products', productRouter);

  // getDb().then(conn => {
  //   console.log(process.env.MONGO_URI || 'mongodb://localhost/node-microservices');
  //   // mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/node-microservices');
  //   mongoose.set('debug', true);
  
  //   app.use('/', indexRouter);
  //   app.use('/products', productRouter);
  //   clearTimeout();
  // }).catch(() => {
  //   setTimeout(() => {
  //     connectToDB();
    
  //   }, 3000);

  
  // });
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use((err, req, res, next) => {
  console.error("Status Code " + res.statusCode)
  if(err instanceof UnauthorizedError) {
    res.status(401).json({error: err.message})
  }

  console.error(err.stack)
  res.status(400).json({error: err.message})
})


// catch 404 and forward to error handler
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
