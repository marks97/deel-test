const express = require('express');

class JobRouter {
  constructor(jobController, getProfileMiddleware) {
    this.jobController = jobController;
    this.getProfileMiddleware = getProfileMiddleware;
    this.router = express.Router();

    this.initRoutes();
  }

  initRoutes() {
    this.router.get(
      '/unpaid',
      this.getProfileMiddleware,
      this.getUnpaidJobsForActiveContracts.bind(this),
    );
  }

  async getUnpaidJobsForActiveContracts(req, res, next) {
    try {
      const { profile } = req;
      const contractRes =
        await this.jobController.getUnpaidJobsForActiveContracts({
          profile,
        });
      res.status(200).json(contractRes);
    } catch (error) {
      next(error);
    }
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = JobRouter;
