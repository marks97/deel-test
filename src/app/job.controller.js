const ServerError = require('../infra/errors/server.error');
const BaseError = require('../infra/errors/base.error');

class JobController {
  constructor(jobService) {
    this.jobService = jobService;
  }

  async getUnpaidJobsForActiveContracts({ profile }) {
    try {
      const jobs = await this.jobService.getUnpaidJobsForActiveContracts({
        profile,
      });

      return {
        payload: jobs,
      };
    } catch (error) {
      console.log('Error:', error);

      throw new ServerError();
    }
  }

  async payJob({ profile, jobId }) {
    try {
      await this.jobService.payJob({ profile, jobId });

      return {
        payload: {
          message: 'Job paid successfully',
        },
      };
    } catch (error) {
      console.log('Error:', error);

      if (error instanceof BaseError) {
        throw error;
      }

      throw new ServerError();
    }
  }
}

module.exports = JobController;
