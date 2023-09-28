const { Op, Sequelize } = require('sequelize');
const BaseError = require('../errors/base.error');
const NotFoundError = require('../errors/not-found.error');

class AdminService {
  constructor({
    sequelize,
    profileModel,
    contractModel,
    jobModel,
    jobService,
  }) {
    this.sequelize = sequelize;
    this.profileModel = profileModel;
    this.contractModel = contractModel;
    this.jobModel = jobModel;
    this.jobService = jobService;
  }

  async depositBalance({ profileId, balance }) {
    const clientProfile = await this.profileModel.findOne({
      where: { id: profileId },
    });

    if (!clientProfile) {
      throw new NotFoundError();
    }

    const unpaidJobsSum = await this.jobService.getUnpaidJobSum({
      profileId,
    });

    const maxDepositAllowed = 0.25 * unpaidJobsSum;

    if (balance > maxDepositAllowed) {
      throw new BaseError(400, 'Deposit exceeds the limit.');
    }

    await clientProfile.increment({ balance });
  }

  async getBestProfession({ start, end }) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const [result] = await this.jobModel.findAll({
      where: {
        paid: { [Op.ne]: null },
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: this.contractModel,
          include: [
            {
              model: this.profileModel,
              as: 'Contractor',
              attributes: ['profession'],
            },
          ],
          attributes: [],
        },
      ],
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('Job.price')), 'totalEarnings'],
        [Sequelize.col('Contract.Contractor.profession'), 'profession'],
      ],
      group: [Sequelize.col('Contract.Contractor.profession')],
      order: [[Sequelize.col('totalEarnings'), 'DESC']],
      limit: 1,
    });

    if (!result) {
      throw new NotFoundError();
    }

    const { profession } = result.dataValues;

    return profession;
  }
}

module.exports = AdminService;
