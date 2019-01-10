//import dependency
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config=require('./config/database');
const User = require("./models/users");

// [SH] Bring in the data model
require('./models/db');

// [SH] Bring in the Passport config after model is defined
require('./config/passport');

//load the server in app
const app = express();

//users routes files`
var routesApi = require('./routes/index');
// const users=require('./routes/users');
// const transactions = require('./routes/transaction');

//port number
const port = 3000;

//cors middleware
app.use(cors());

//set static folders
app.use(express.static(path.join(__dirname,'public')));

//body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//user route use
app.use('/api', routesApi);
// app.use('/users',users);
// app.use('/transactions', transactions);

// //index route
// app.get('/',(req, res)=> {
//     res.send('Invalid EndPoint');
// });
//
//  app.post('*',(req,res)=> {
//     res.send(req);
// });

app.get('/', function(req, res) {
  res.send('Hello World')
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

//start server
app.listen(port, () => {
    console.log('Server Started Port No::: ' + port)
});
