const express = require('express');

const router = express.Router();

const routes = require('../container');

router.use('/contracts', routes.contractRoutes);
router.use('/jobs', routes.jobRoutes);
router.use('/admin', routes.adminRoutes);

module.exports = router;
