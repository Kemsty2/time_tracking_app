//  #region Import
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rotatingFileStream = require("rotating-file-stream");
const path = require("path");
const fs = require("fs");
const route = require("./route");
const methodOverride = require("method-override");
const createError = require("http-errors");
const { domainMiddleWare, errorHandler } = require("./middleware");

//  #endregion Import

const app = express();

// #region Middlewares

//  #region body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//  #endregion body-parser moddleware

//  #region  morgan

const logDirectory = path.join(__dirname, "logs");

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rotatingFileStream("access.log", {
  interval: "1d", // rotate daily
  path: logDirectory,
  size: "500B",
  compress: true
});

process.env.NODE_ENV === "production"
  ? app.use(morgan("tiny", { stream: accessLogStream }))
  : app.use(morgan("dev"));

//  #endregion  End morgan
app.use(domainMiddleWare);

/*  #endregion Middlewares */

app.use("/", route);

//  #region error handler middleware
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(methodOverride());

app.use(errorHandler);

//  #endregion

module.exports = app;
