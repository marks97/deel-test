const express = require('express');

const router = express.Router();

const routes = require('../container');

router.use('/contracts', routes.contractRoutes);

module.exports = router;
