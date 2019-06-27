const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.send('process ' + process.pid + ' says hello!').end();
});

module.exports = route;