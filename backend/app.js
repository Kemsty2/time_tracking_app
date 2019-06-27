//  #region Import
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const rotatingFileStream = require('rotating-file-stream');
const path = require('path');
const fs = require('fs');
const route = require('./route');

//  #endregion Import

const app = express();


// #region Middlewares

//  #region body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//  #endregion body-parser moddleware

//  #region  morgan

const logDirectory = path.join(__dirname, 'logs');
 
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
 
// create a rotating write stream
const accessLogStream = rotatingFileStream('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory,
  size: '500B',
  compress: true
});

process.env.NODE_ENV === "production" ? app.use(morgan('tiny', { stream: accessLogStream })) : app.use(morgan('dev'));

//  #endregion  End morgan

//  #region error handler middleware


//  #endregion


/*  #endregion Middlewares */

app.use('/', route);

module.exports = app;


