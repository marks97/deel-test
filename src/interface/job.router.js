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

    this.router.post(
      '/:job_id/pay',
      this.getProfileMiddleware,
      this.payJob.bind(this),
    );
  }

  async getUnpaidJobsForActiveContracts(req, res, next) {
    try {
      const { profileId } = req.profile;
      const jobRes = await this.jobController.getUnpaidJobsForActiveContracts({
        profileId,
      });
      res.status(200).json(jobRes);
    } catch (error) {
      next(error);
    }
  }

  async payJob(req, res, next) {
    try {
      const { profile } = req;
      const { job_id: jobId } = req.params;

      const payRes = await this.jobController.payJob({
        profile,
        jobId,
      });
      res.status(200).json(payRes);
    } catch (error) {
      next(error);
    }
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = JobRouter;
