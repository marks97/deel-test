const express = require('express');
const bodyParser = require('body-parser');

const router = require('./interface/router');

const app = express();
app.use(bodyParser.json());
app.use('/', router);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.httpCode).send({ error: { message: err.message } });
});

module.exports = app;
