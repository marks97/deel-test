const { Op } = require('sequelize');
const { CONTRACT } = require('../../domain/constants');
const BaseError = require('../errors/base.error');

class JobService {
  constructor({ sequelize, jobModel, contractModel, profileModel }) {
    this.sequelize = sequelize;
    this.jobModel = jobModel;
    this.contractModel = contractModel;
    this.profileModel = profileModel;
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

  async payJob({ jobId }) {
    const job = await this.jobModel.findOne({
      where: {
        id: jobId,
      },
      include: [
        {
          model: this.contractModel,
          include: [
            {
              model: this.profileModel,
              as: 'Contractor',
            },
            {
              model: this.profileModel,
              as: 'Client',
            },
          ],
        },
      ],
    });

    const { Contract: contract, price: amount, paid } = job;
    const { Contractor: contractor, Client: client } = contract;

    if (paid) {
      throw new BaseError(400, 'Job already paid');
    } else if (client.balance < amount) {
      throw new BaseError(400, 'Client has insufficient funds');
    }

    this.sequelize.transaction(async t => {
      await client.decrement({ balance: amount }, { transaction: t });
      await contractor.increment({ balance: amount }, { transaction: t });
      await job.update({ paid: true }, { transaction: t });
    });
  }
}

module.exports = JobService;
