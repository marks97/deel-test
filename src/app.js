const express = require('express');
const bodyParser = require('body-parser');

const router = require('./interface/router');

const app = express();
app.use(bodyParser.json());
app.use('/', router);
app.use((err, req, res) => {
  res.status(err.httpCode).send({ error: { message: err.message } });
});

module.exports = app;
