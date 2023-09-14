var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

var authService = require('./services/auth-service');

var mongoose = require('mongoose');
var cors = require('cors');

// mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/node-microservices');
// mongoose.set('debug', true);

const { UnauthorizedError } = require('express-jwt');

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
    app.use('/', indexRouter);
    app.use('/auth', authRouter);
    
    authService.userSeeder().then(() => {
      console.log("Seed Executed");
    });
        
  }).catch(() => {
    console.log(new Date() + " : <<< Got Connection Error >>>");
    
    setTimeout(() => {
      connectToDB();
    
    }, 10000);

  });
}

connectToDB();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const jsonErrorHandler = (err, req, res, next) => {
  res.status(500).send({ error: err });
}
app.use(jsonErrorHandler)

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
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
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify(err));
// });

module.exports = app;
