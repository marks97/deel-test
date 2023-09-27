const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./infra/database/sequelize');
const { getProfile } = require('./infra/middleware/get-profile.middleware');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/**
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
  const { Contract } = req.app.get('models');
  const { id } = req.params;
  const contract = await Contract.findOne({ where: { id } });
  if (!contract) return res.status(404).end();
  return res.json(contract);
});

module.exports = app;
