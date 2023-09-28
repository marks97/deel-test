const ServerError = require('../infra/errors/server.error');

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
}

module.exports = JobController;
