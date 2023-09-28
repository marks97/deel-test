const { Op } = require('sequelize');
const { CONTRACT } = require('../../domain/constants');

class JobService {
  constructor(jobModel, contractModel) {
    this.jobModel = jobModel;
    this.contractModel = contractModel;
  }

  async getUnpaidJobsForActiveContracts({ profile }) {
    const { id: profileId } = profile;

    return this.jobModel.findAll({
      where: {
        paid: null,
      },
      include: [
        {
          model: this.contractModel,
          where: {
            status: CONTRACT.STATUS_IN_PROGRESS,
            [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          },
        },
      ],
    });
  }
}

module.exports = JobService;
