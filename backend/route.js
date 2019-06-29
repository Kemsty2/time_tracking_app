const express = require("express");
const route = express.Router();
const createError = require('http-errors');

route.get("/", (req, res) => {
  res.send("process " + process.pid + " says hello!").end();
});

route.get("/error", (req, res, next) => {
  next(createError(500, "/error is an error endpoint"));
});

route.get("/timeout-error", function(req, res, next) {
  setTimeout(function() {
    throw new Error("BOOM");
  }, 10);
});

module.exports = route;
